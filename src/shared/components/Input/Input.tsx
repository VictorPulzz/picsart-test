import clsx from 'clsx';
import React, {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Icon, IconProps, Typography } from '~/shared/components';
import { useClickOutside } from '~/shared/hooks';

import styles from './Input.module.scss';

export type InputType = 'text' | 'submit';

type InputOrTextareaType<IsArea = false> = IsArea extends false
  ? HTMLInputElement
  : HTMLTextAreaElement;

export type DefaultInputProps<IsArea = false> = {
  leftIcon?: IconProps;
  rightIcon?: IconProps;
  className?: string;
  postfix?: string;
  variant?: 'default' | 'small' | 'big';
  error?: string;
  type?: InputType;
  label?: string;
  disabled?: boolean;
  onlyNumber?: boolean;
  showCounter?: boolean;
  clickable?: boolean;
  onBlurHandle?: () => void;
  rightBlock?: ReactElement | boolean | ((isFocus: boolean) => ReactNode);
  leftBlock?: ReactElement | boolean;
  classNameInner?: string;
  onChangeText?: (value: string) => void;
  submit?: () => void;
} & (IsArea extends false
  ? InputHTMLAttributes<HTMLInputElement> & { multiline?: boolean }
  : TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: boolean });

type ForwardRefInputProps<IsArea = false> = DefaultInputProps<IsArea> & {
  ref?: Ref<InputOrTextareaType<IsArea>>;
};

const BaseInput = <IsArea extends boolean = false>(
  {
    variant = 'default',
    type = 'text',
    multiline,
    className,
    error,
    leftIcon,
    rightIcon,
    label,
    disabled,
    onFocus,
    onBlurHandle,
    clickable = true,
    rightBlock,
    classNameInner,
    onChange,
    onChangeText,
    maxLength,
    value,
    showCounter,
    leftBlock,
    onlyNumber,
    submit,
    postfix,
    ...props
  }: DefaultInputProps<IsArea>,
  forwardRef: ForwardedRef<Unidentifiable<InputOrTextareaType<IsArea>>>,
): ReactElement => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<InputOrTextareaType<IsArea>>();
  const divRef = useRef<HTMLDivElement>(null);
  const [inputLength, setInputLength] = useState(((value as string) || '').length);

  const classes = useMemo(
    () =>
      clsx(
        styles[`input_${variant}`],
        isFocus && styles.input_focus,
        multiline && styles.input_multiline,
        error && styles.error,
        disabled && styles.input_disabled,
        !clickable && styles.input_clickable,
        classNameInner,
      ),
    [classNameInner, error, isFocus, variant, multiline, disabled, clickable],
  );

  const focusIn = useCallback(
    (e: FocusEvent<HTMLInputElement & HTMLTextAreaElement>) => {
      if (disabled || !clickable) return;
      inputRef?.current?.focus();
      setIsFocus(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    [disabled, onFocus, clickable],
  );

  const focusOut = useCallback(() => {
    inputRef?.current?.blur();
    setIsFocus(false);
    if (onBlurHandle) {
      onBlurHandle();
    }
  }, [onBlurHandle]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
      const val = e.target.value;
      if (val && maxLength && maxLength === +String(val).length) return;

      if (!!val && onlyNumber && !/^\d+$/.test(val)) {
        return;
      }
      onChange?.(e);
      onChangeText?.(val);
      setInputLength(String(val).length);
    },
    [maxLength, onChange, onChangeText, onlyNumber],
  );

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement & HTMLTextAreaElement>) => {
      if (e.keyCode === 13 && submit) {
        submit();
      }
      if (e.keyCode === 9 || e.keyCode === 27) {
        focusOut();
      }
    },
    [focusOut, submit],
  );

  const renderRightBlock = (): ReactNode => {
    if (rightBlock) {
      if (typeof rightBlock === 'function') return rightBlock(isFocus);
      return rightBlock;
    }
    return <></>;
  };

  useClickOutside({
    ref: divRef,
    handler: () => focusOut(),
  });

  useImperativeHandle(forwardRef, () => inputRef?.current);

  return (
    <div className={className}>
      <div
        role="button"
        ref={divRef}
        className={classes}
        onClick={e => focusIn(e as unknown as FocusEvent<HTMLInputElement & HTMLTextAreaElement>)}
      >
        {leftIcon && <Icon {...leftIcon} className={clsx(leftIcon.className, 'mr-3')} />}
        {!!leftBlock && leftBlock}
        <div className="relative flex flex-col flex-1 h-full">
          {label && (
            <Typography variant="p1" className={styles.label}>
              {label}
            </Typography>
          )}
          {multiline ? (
            <textarea
              {...{ value, maxLength }}
              {...(props as DefaultInputProps<true>)}
              className={styles.textarea}
              ref={inputRef as Ref<HTMLTextAreaElement>}
              autoComplete="none"
              onFocus={focusIn}
              disabled={disabled || !clickable}
              onChange={handleChange}
              onKeyDown={handleKey}
            />
          ) : (
            <input
              type={type}
              {...{ value, maxLength }}
              {...(props as DefaultInputProps<false>)}
              className={styles.input}
              disabled={disabled || !clickable}
              onFocus={focusIn}
              ref={inputRef as Ref<HTMLInputElement>}
              autoComplete="none"
              onChange={handleChange}
              onKeyDown={handleKey}
            />
          )}
          {multiline && showCounter && !!maxLength && (
            <Typography variant="p4" tag="p" className={styles.input_counter}>
              {inputLength}/{maxLength}
            </Typography>
          )}
        </div>

        {!!rightBlock && renderRightBlock()}

        <div className={isFocus ? 'text-primary-dark-blue dark:text-white' : 'text-secondary-grey'}>
          {rightIcon && <Icon {...rightIcon} />}
        </div>
      </div>
    </div>
  );
};

export const Input = forwardRef(BaseInput) as <T extends boolean>(
  p: ForwardRefInputProps<T>,
) => ReactElement;
