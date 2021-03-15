import classnames from "classnames";
import * as React from "react";
import { useState } from "react";

type ClassName = undefined | string;

type ClassNameDefinition<P> = ClassName | ((props: P) => ClassName);

export function wrapComp<E extends keyof JSX.IntrinsicElements>(
  element: E,
  className?: ClassNameDefinition<JSX.IntrinsicElements[E]>
): React.FunctionComponent<JSX.IntrinsicElements[E]>;
export function wrapComp<P extends { className?: string }>(
  component: React.ComponentType<P>,
  className?: ClassNameDefinition<P>
): React.ComponentType<P>;

// The implementation attempts to do more than the function
// prototypes express: The second parameters can also be a props
// object. I didn't manage to get the typings correct for that
// usage though.
export function wrapComp(
  elementOrComponent: any,
  classNameOrPropsDefinition: any
): any {
  const Component = elementOrComponent;
  function Comp(props: any) {
    const classNameOrProps =
      typeof classNameOrPropsDefinition === "function"
        ? classNameOrPropsDefinition(props)
        : classNameOrPropsDefinition;

    const outerProps =
      typeof classNameOrProps === "object"
        ? {
            ...classNameOrProps,
            className: classnames(props.classNameconfigObject["className"]),
          }
        : typeof classNameOrProps === "string"
        ? { className: classnames(classNameOrProps, props.className) }
        : {};
    return <Component {...props} {...outerProps} />;
  }
  return Comp;
}

export const Row = wrapComp("div", "flex flex-row");
export const RowReverse = wrapComp(Row, "flex-row-reverse space-x-reverse");
export const Col = wrapComp("div", "flex flex-col");
export const ColReverse = wrapComp(Col, "flex-col-reverse space-y-reverse");

export default function App() {
  const [flag, setFlag] = useState(false);

  return (
    <Row className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </Row>
  );
}
