import React, { PureComponent } from 'react';


class EmptyView extends PureComponent {


  componentWillMount() {

    console.log(Object.keys(this.props.match.params))

  }

  render() {

    const { id} =this.props.match.params;

    return (<div>
    </div>);
  }


}

export default EmptyView;
