import React, { Component } from 'react';

/*
PhoneForm2 - state(name, phone) => App에 data를 전달 / 그리고 다시 state(name, phone) 초기화

전에는 App -> 해당 자식 Component로 일방향으로 데이터가 흘러갔다면
이번에는 다시 App이라는 부모로 데이터를 보냄
*/


class PhoneForm3 extends Component {
    state = {
        name: '',
        phone: ''
    }

    // e.target이 input element를 가리키고 거기 안에 name 속성을 가지고 접근
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        // 페이지 리로딩 방비
        e.preventDefault();
        // 상태값을 onCreate를 통해 부모에게 전달
        this.props.onCreate(this.state);
        // 상태 초기화
        this.setState({
            name: '',
            phone: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    placeholder="이름"
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="name"
                />

                <input
                    placeholder="전화번호"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    name="phone"
                />

                <button type="submit">등록</button>
            </form>
        );
    }
}

export default PhoneForm3;