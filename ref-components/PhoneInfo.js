import React, { Component } from 'react';

class PhoneInfo extends Component {
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        }
    }

    state = {
        // 눌렀을 때 editing 값을 true로 설정
        // 기존에 텍스트 형태로 보여주던 값들을 input 형태로 보여주도록 합니다.
        editing: false,
        // input 값을 담기 위해서 각 필드를 위한 값도 설정
        name: '',
        phone: ''
    }

    handleRemove = () => {
        const { info, onRemove } = this.props;
        onRemove(info.id);
    }

    handleToggleEdit = () => {
        const { editing } = this.state;
        this.setState({ editing: !editing });
    }

    // input 에서 onChange 이벤트가 발생 될 때  호출되는 함수
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        // editing 값이 바뀔 때 처리 할 로직
        // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
        // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.
        const { info, onUpdate } = this.props;
        if (!prevState.editing && this.state.editing) {
            // editing 값이 false -> true 로 전환 될 때
            // info 의 값을 state 에 넣어준다
            this.setState({
                name: info.name,
                phone: info.phone
            })
        }

        if (prevState.editing && !this.state.editing) {
            // editing 값이 true -> false 로 전환 될 때
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
        if (!this.state.editing
            && !nextState.editing
            && nextProps.info === this.props.info) {
            return false;
        }
        // 나머지 경우엔 리렌더링함
        return true;
    }


    render() {
        const style = {
            border: '2px solid blue',
            padding: '8px',
            margin: '8px'
        };

        const { editing } = this.state;

        if (editing) { // 수정모드
            return (
                <div style={style}>
                    <div>
                        <input
                            value={this.state.name}
                            name="name"
                            placeholder="이름"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            value={this.state.phone}
                            name="phone"
                            placeholder="전화번호"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button onClick={this.handleToggleEdit}>적용</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            );
        }

        const {
            name, phone, id
        } = this.props.info;

        return (
            <div style={style}>
                <div><b>{id}</b></div>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleToggleEdit}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}

export default PhoneInfo;