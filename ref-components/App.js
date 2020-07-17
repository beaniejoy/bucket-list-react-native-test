import React, { Component, Fragment } from 'react';
import PhoneForm from './components/PhoneForm.js';
import PhoneForm2 from './components/PhoneForm2.js';
import DottedBox from './aboutCss/DottedBox.js';
import DashedBox from './aboutCss/DashedBox.js';
import PhoneInfoList from './components/PhoneInfoList.js';

class App extends Component {

    id = 2;

    state = {
        information: [
            {
                id: 0,
                name: 'beanie',
                phone: '010-1111-2222'
            },
            {
                id: 1,
                name: 'joy',
                phone: '010-2222-1111'
            }
        ],

        keyword: ''
    }

    handleCreate = (data) => {
        console.log(this.state);

        const { information } = this.state;
        this.setState({
            information: information.concat({ id: this.id++, ...data })
        });
    }

    handleRemove = (id) => {
        const { information } = this.state;
        this.setState({
            information: information.filter(info => info.id !== id)
        })
    }

    handleUpdate = (id, data) => {
        const { information } = this.state;
        this.setState({
            information: information.map(
                info => id === info.id
                    ? { ...info, ...data } // 새 객체를 만들어서 기존의 값과 전달받은 data를 덮어쓴다.
                    : info // 아니면 기존 데이터 유지
            )
        })
    }

    handleChange = (e) => {
        this.setState({
            keyword: e.target.value,
        });
    }

    render() {

        const { information, keyword } = this.state;

        // 이런 식으로 검색 기능을 만들 수 있다.
        const filteredList = information.filter(
            info => info.name.indexOf(keyword) !== -1
        ); 

        return (
            <>
                <div>
                    <h3>Step 1</h3>
                    <PhoneForm />
                </div>

                <div>
                    <h3>Step 2</h3>

                    <PhoneForm2 onCreate={this.handleCreate} />
                </div>

                <div>
                    <h3>Step 3</h3>

                    <PhoneForm2 onCreate={this.handleCreate} />
                    {JSON.stringify(information)}
                </div>

                <div>
                    <DottedBox />
                </div>

                <div>
                    <DashedBox />
                </div>

                <div>
                    <PhoneForm2 onCreate={this.handleCreate} />
                    <p>
                        <input
                            placeholder="검색 할 이름을 입력하세요.."
                            onChange={this.handleChange}
                            value={keyword}
                        />
                    </p>
                    <PhoneInfoList data={this.state.information.filter(
                        info => {
                            return info.name.includes(keyword)
                        }
                    )}
                        onRemove={this.handleRemove}
                        onUpdate={this.handleUpdate} />
                </div>
            </>
        );
    }
}

export default App;