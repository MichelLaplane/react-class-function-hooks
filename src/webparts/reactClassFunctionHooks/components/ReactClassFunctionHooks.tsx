import * as React from 'react';
import { useEffect, useCallback, useReducer, useState } from "react";
import styles from './ReactClassFunctionHooks.module.scss';
import { IReactClassFunctionHooksProps } from './IReactClassFunctionHooksProps';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IFunctionalComponentProps {
  title: string;
  keyPressed:string;
}

export const FunctionalComponent: React.FunctionComponent<IFunctionalComponentProps> = (props: IFunctionalComponentProps) => {

  const [keyPressedValue,setKeyPressedValue] = useState("");

  const keydownListener = useCallback(
    keydownEvent => {
      const { code, key,keyCode,ctrlKey,altKey,srcElement, target, repeat } = keydownEvent;
      props.keyPressed = key;
      console.log('You just pressed the key:' + key);
      setKeyPressedValue(key);
    },[]);

  useEffect(() => {
    window.addEventListener("keydown", keydownListener);
    return () => window.removeEventListener("keydown", keydownListener);
  }, []);
  return (
    <div>
      <h1>{props.title}</h1>
     <div>keyPressed props: {props.keyPressed}</div>
     <div>keyPressedValue state:  {keyPressedValue}</div>
     </div>
  );
};

export interface IClassComponentProps {
  title: string;
}
export interface IClassComponentState {
  count: number;
}

class ClassComponent extends React.Component<IClassComponentProps,IClassComponentState> {
  constructor(props: IClassComponentProps) {
    super(props);
    this.state = {
      count: 0
    };
  }

  public render(): React.ReactElement<IClassComponentProps> {

    return (

      <div>
        <h1>{this.props.title}</h1>
        <div>{this.state.count}</div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Add</button>
      </div>
    );
  }

}

export default class ReactClassFunctionHooks extends React.Component<IReactClassFunctionHooksProps, {}> {

  public render(): React.ReactElement<IReactClassFunctionHooksProps> {

    return (

      <div className={styles.reactClassFunctionHooks}>
        <div className={styles.container}>
          <div className={styles.row}>
            <FunctionalComponent title="This is a function component" keyPressed=""></FunctionalComponent>
            <ClassComponent title="This is a class component"></ClassComponent>
          </div>
        </div>
      </div>

    );
  }

}
