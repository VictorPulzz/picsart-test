import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, ReactNode, useMemo } from 'react';
import ReactModal, { Styles } from 'react-modal';

import styles from './Modal.module.scss';

export interface ModalProps {
  children: ReactNode;
  visible: boolean;
  withPadding?: boolean;
  toggleVisible: () => void;
  className?: string;
  top?: boolean;
  onAfterClose?: () => void;
}

const useStyles = ({ top }: Pick<ModalProps, 'top'>): Styles => {
  return useMemo(
    () => ({
      content: {
        width: '100%',
        height: '100%',
        background: 'transparent',
        justifyContent: 'center',
        alignItems: top ? 'flex-start' : 'center',
        ...(top
          ? {
              paddingTop: '100px',
            }
          : {}),
        display: 'flex',
        borderRadius: 0,
        inset: 0,
        border: 0,
      },
      overlay: {
        zIndex: 30,
        background: 'transparent',
        width: '100%',
        height: '100%',
      },
    }),
    [top],
  );
};

export const Modal: FC<ModalProps> = ({
  visible = false,
  toggleVisible,
  children,
  className,
  withPadding = true,
  top,
  onAfterClose,
}) => {
  const classes = useStyles({ top });

  return (
    <AnimatePresence>
      {visible && (
        <ReactModal
          ariaHideApp={false}
          onAfterClose={onAfterClose}
          isOpen={visible}
          style={classes}
        >
          <motion.div
            onClick={toggleVisible}
            animate={{
              opacity: 1,
            }}
            className={styles.backdrop}
            exit={{
              opacity: 0,
              transition: { duration: 0.3 },
            }}
            initial={{
              opacity: 0,
            }}
          />
          <motion.div
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            className={clsx(styles.container, className)}
            exit={{
              opacity: 0,
              y: 60,
              transition: { duration: 0.3 },
            }}
            initial={{
              opacity: 0,
              y: 60,
            }}
          >
            <div className={clsx(withPadding && 'py-6 px-5')}>{children}</div>
          </motion.div>
        </ReactModal>
      )}
    </AnimatePresence>
  );
};
