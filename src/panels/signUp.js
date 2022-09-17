import { Group, PanelHeader, View, Panel, Button, FormLayout, FormItem, Input, FormLayoutGroup, DatePicker, Select, Textarea, Checkbox, Link, ConfigProvider, AdaptivityProvider, AppRoot, SplitLayout, WebviewType, ScreenSpinner, } from "@vkontakte/vkui"
import axios from "axios";
import React from "react";


export class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password1: "",
            password2: "",
            bio: "",
            date: { day: 1, month: 1, year: 2002 },
            sex: 0,
            phoneNumber: "",
            nickname: "",
            popout: null
        };

        this.onChange = this.onChange.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
    }

    onChange(e) {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }

    onSignUp() {
        this.setState({ popout: <ScreenSpinner state="loading" /> })
        axios
            .post("https://b451dbd8trial-dev-dice.cfapps.us10.hana.ondemand.com/main/Users", {
                username: this.state.nickname,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                bio: this.state.bio,
                dateOfBirth: new Date(this.state.date.year, this.state.date.month - 1, this.state.date.day, 3, 0, 0).toISOString().substring(0, 10)
            })
            .then(response => {
                this.setState({ popout: <ScreenSpinner state="done" /> })
                localStorage.setItem("user", JSON.stringify(response.data.ID))
                setTimeout(() => { this.props.setLoged(true), this.props.setWillSignUp(false) } , 1500)
            })
            .catch((e) => {
                console.log(e);
                this.setState({ popout: <ScreenSpinner state="error" /> })
                setTimeout(() => this.setState({ popout: null }), 1500)
            })
    }

    render() {
        const { email, password1, password2, nickname } = this.state;

        return (
            <ConfigProvider webviewType={WebviewType.INTERNAL}>
                <AdaptivityProvider hasMouse={true}>
                    <AppRoot>
                        <SplitLayout
                            header={<PanelHeader separator={false} />}
                            style={{ justifyContent: "center" }}
                            popout={this.state.popout}
                        >
                            <View activePanel="new-user">
                                <Panel id="new-user">
                                    <PanelHeader className="shadowPanelHeader" separator={false}>Регистрация</PanelHeader>
                                    <Group>
                                        <FormLayout>
                                            <FormItem
                                                top="E-mail"
                                            >
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={this.onChange}
                                                />
                                            </FormItem>

                                            <FormLayoutGroup >
                                                <FormItem top="Никнейм">
                                                    <Input name="nickname" value={this.state.nickname} onChange={this.onChange}/>
                                                </FormItem>
                                            </FormLayoutGroup>

                                            <FormItem top="Пароль">
                                                <Input
                                                    type="password"
                                                    name="password1"
                                                    value={password1}
                                                    onChange={this.onChange}
                                                    placeholder="Введите пароль"
                                                />
                                            </FormItem>

                                            <FormItem
                                                status={password1 != "" ?
                                                    password2 != "" ?
                                                        password1 == password2 ? "valid" : "error"
                                                        : "default"
                                                    : "default"}
                                                bottom={
                                                    password1 != "" ?
                                                        password2 != "" ?
                                                            password1 == password2 ? "Пароли совпадают!" : "Пожалуйста, введите корректный пароль"
                                                            : "Пароль может содержать только латинские буквы и цифры"
                                                        : "Пароль может содержать только латинские буквы и цифры"
                                                }>
                                                <Input
                                                    type="password"
                                                    name="password2"
                                                    value={password2}
                                                    onChange={this.onChange}
                                                    placeholder="Повторите пароль"
                                                />
                                            </FormItem>

                                            <FormLayoutGroup>
                                                <FormItem top="Номер телефона">
                                                    <Input 
                                                        value={this.state.phoneNumber} 
                                                        type="phone" 
                                                        placeholder="+375290000000"
                                                        name="phoneNumber"
                                                        onChange={this.onChange} 
                                                    />
                                                </FormItem>
                                            </FormLayoutGroup>

                                            <FormItem top="Дата рождения">
                                                <DatePicker
                                                    min={{ day: 1, month: 1, year: 1901 }}
                                                    max={{ day: 31, month: 12, year: 2022 }}
                                                    dayPlaceholder="ДД"
                                                    monthPlaceholder="MM"
                                                    yearPlaceholder="ГГ"
                                                    defaultValue={this.state.date}
                                                    onDateChange={value => this.setState({date: value})}
                                                />
                                            </FormItem>

                                            <FormItem top="Пол">
                                                <Select
                                                    placeholder="Выберите пол"
                                                    defaultValue={0}
                                                    name="sex"
                                                    onChange={this.onChange}
                                                    options={[
                                                        {
                                                            value: 1,
                                                            label: "Мужской",
                                                        },
                                                        {
                                                            value: 2,
                                                            label: "Женский",
                                                        },
                                                        {
                                                            value: 3,
                                                            label: "Другой",
                                                        },
                                                    ]}
                                                />
                                            </FormItem>
                                            <FormItem top="О себе">
                                                <Textarea name="bio" onChange={this.onChange} value={this.state.bio}/>
                                            </FormItem>
                                            <FormItem>
                                                <Button 
                                                    size="l" 
                                                    stretched
                                                    onClick={this.onSignUp}
                                                    disabled={password1 == "" || password2 == "" || password1 != password2 || nickname == ""}
                                                >
                                                    Зарегистрироваться
                                                </Button>
                                            </FormItem>
                                        </FormLayout>
                                    </Group>
                                </Panel>
                            </View>
                        </SplitLayout>
                    </AppRoot>
                </AdaptivityProvider>
            </ConfigProvider>
        );
    }
}