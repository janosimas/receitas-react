import * as R from 'ramda';
import * as React from 'react';
import { MyComponent } from "./myComponent";

export class MyComponent2 extends MyComponent {
  constructor(props: any) {
    super(props);
  }

  protected objectRender(obj: object) {
    const view = [];
    if (R.isNil(obj)) {
      console.log('no item');
      return (<div />);
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        const typeRender: string = typeof element + 'Render';
        if (!R.isNil(this[typeRender])) {
          view.push(<div key={key}>{key + ': '} {this[typeRender](element)}</div>);
        } else {
          view.push(<div key={key}>{key + ': '} {`unknown property of type ${typeof element}`}</div>);
        }
      }
    }
    return (
      <div style={{
        left: 20,
        position: "relative",
      }}>
        {view}
      </div>
    )
  }

  protected stringRender(text: string): JSX.Element {
    return <span style={{ fontWeight: "bold" }} >{text}</span>;
  }
}
