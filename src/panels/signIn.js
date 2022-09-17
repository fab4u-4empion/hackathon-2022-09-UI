import { Group, PanelHeader, View, Panel, Button, FormLayout, FormItem, Input, FormLayoutGroup, DatePicker, Select, Textarea, Checkbox, Link, ConfigProvider, AdaptivityProvider, AppRoot, SplitLayout, ScreenSpinner, Header, Separator, Snackbar, Avatar, WebviewType, } from "@vkontakte/vkui"
import React from "react";
import '@vkontakte/vkui/dist/vkui.css';
import axios from "axios";
import { Icon16Cancel, Icon16ErrorCircleFill } from "@vkontakte/icons";

export class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: "",
            password: "",
            popout: null,
            snackbar: null
        };

        this.onChange = this.onChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSignIn = this.onSignIn.bind(this)
    }

    onChange(e) {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }

    onRemove(e) {
        this.setState({ showPatronym: false });
    }

    onSignIn() {
        this.setState({popout: <ScreenSpinner state="loading"/>})
        axios
            .get(`https://b451dbd8trial-dev-dice.cfapps.us10.hana.ondemand.com/main/Users?$filter=username%20eq%20%27${this.state.nickname}%27`)
            .then(response => {
                if (response.data.value.length > 0) {
                    this.setState({ popout: <ScreenSpinner state="done" /> })
                    localStorage.setItem("user", JSON.stringify(response.data.value[0]["ID"]))
                    setTimeout(() => this.props.setLoged(true), 1500)
                }
                else {
                    this.setState({ popout: <ScreenSpinner state="error" /> })
                    setTimeout(() => this.setState({ 
                        popout: null, 
                        snackbar: 
                            <Snackbar 
                                onClose={() => this.setState({snackbar: null})}
                                layout="vertical"
                                before={
                                    <Avatar
                                        size={24}
                                        style={{ background: "var(--orange)" }}
                                    >
                                        <Icon16Cancel fill="#fff" width={14} height={14} />
                                    </Avatar>
                                }
                                action="Зарегистрироваться"
                                onActionClick={() => this.props.onSignUp(true)}
                            >
                                Такого пользователя не существует
                            </Snackbar> 
                    }), 1000)
                }
            })
            .catch(() => {
                this.setState({ popout: <ScreenSpinner state="error" /> })
                setTimeout(() => this.setState({ popout: null }), 1500)
            })
    }

    render() {
        const { nickname, password } = this.state;

        return (
            <ConfigProvider webviewType={WebviewType.INTERNAL}>
                <AdaptivityProvider>
                    <AppRoot>
                        <SplitLayout
                            header={<PanelHeader separator={false} />}
                            style={{ justifyContent: "center" }}
                            popout={this.state.popout}
                        >
                            <View activePanel="new-user">
                                <Panel id="new-user">
                                    <PanelHeader>Авторизация</PanelHeader>
                                    <Group>
                                        <FormLayout>
                                            <FormItem top="Никнейм">
                                                <Input
                                                    type="nickname"
                                                    name="nickname"
                                                    value={nickname}
                                                    onChange={this.onChange}
                                                    placeholder="Введите никнейм"
                                                />
                                            </FormItem>
                                            <FormItem top="Пароль">
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={this.onChange}
                                                    placeholder="Введите пароль"
                                                />
                                            </FormItem>
                                            <FormItem>
                                                <Button 
                                                    onClick={this.onSignIn} 
                                                    size="l" 
                                                    stretched 
                                                    disabled={!nickname || !password}
                                                >
                                                    Авторизоваться
                                                </Button>
                                            </FormItem>
                                            <Separator/>
                                            <FormItem>
                                                <Header style={{ justifyContent: "center" }} mode="secondary">Еще нет аккаунта?</Header>
                                                <Button
                                                    size="l"
                                                    stretched
                                                    onClick={() => this.props.onSignUp(true)}
                                                >
                                                    Зарегистрироваться
                                                </Button>
                                            </FormItem>
                                        </FormLayout>
                                        {this.state.snackbar}
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