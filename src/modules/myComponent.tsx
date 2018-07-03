import * as R from 'ramda';
import * as React from 'react';

export class MyComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      obj: {
        endereco: {
          logradouro: 'Rua dos bobos',
          numero: 0
        },
        idade: 5,
        name: 'nome',
      }
    }

    this.handleChange = this.handleChange.bind(this);
  }

  public render() {
    const { obj } = this.state;

    console.log(obj);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        console.log(element);

      }
    }

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
          view.push(<div key={key}>{key+': '} {this[typeRender](element)}</div>);
        } else {
          view.push(<div key={key}>{key+': '} {`unknown property of type ${typeof element}`}</div>);
        }
      }
    }
    return (
      <div>{view}</div>
    )
  }

  protected handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const json = JSON.parse(event.currentTarget.value);
    this.setState({ json });
  }

  protected stringRender(text: string) {
    return text;
  }

  protected numberRender(num: number) {
    return num;
  }
}
