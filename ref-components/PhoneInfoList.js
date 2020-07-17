import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo.js';

class PhoneInfoList extends Component {
    static defaultProps = {
        list: [],
        onRemove: () => console.warn('onRemove not defined'),
        onUpdate: () => console.warn('onUpdate not defined')
    }

    //변화가 필요하지 않을 때는 render 함수가 호출되지 않도록
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data !== this.props.data;
    }

    // state와 props를 잘 알아야 부모와 자식간 데이터 교류를 잘 할 수 있다.
    render() {
        const { data, onRemove, onUpdate } = this.props;
        const list = data.map(
            info => (
                <PhoneInfo
                    key={info.id}
                    info={info}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                />
            )
        );

        return (
            <div>
                {list}
            </div>
        )
    }
}

export default PhoneInfoList;