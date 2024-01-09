import { equals } from 'rambda';
import React, { forwardRef, memo, useImperativeHandle } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';

interface ActionBase extends Action<string> {}

const AppDispatchComponent = forwardRef(function AppDispatchComponent(
  props,
  ref
) {
  const dispatch = useDispatch();
  useImperativeHandle(
    ref,
    () => ({
      dispatch: (action: ActionBase) => {
        dispatch(action);
      },
    }),
    [dispatch]
  );
  return null;
});

type AppDispatchType = {
  dispatch: (action: ActionBase) => void;
};
const dispatchRef = React.createRef<AppDispatchType>();

export const AppDispatch = memo(function AppDispatch() {
  return <AppDispatchComponent ref={dispatchRef} />;
}, equals);

/**
 * Using to dispatch action to store
 * @param action
 */
export const dispatch = (action: ActionBase) => {
  if (dispatchRef.current) {
    dispatchRef.current.dispatch(action);
  }
};
