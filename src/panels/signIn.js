import { Group, PanelHeader, View, Panel, Button, FormLayout, FormItem, Input, FormLayoutGroup, DatePicker, Select, Textarea, Checkbox, Link, ConfigProvider, AdaptivityProvider, AppRoot, SplitLayout, } from "@vkontakte/vkui"
import React from "react";
import '@vkontakte/vkui/dist/vkui.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: "",
            password: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onChange(e) {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }


    onRemove(e) {
        this.setState({ showPatronym: false });
    }

    render() {
        const { nickname, password } = this.state;

        return (
            <ConfigProvider>
                <AdaptivityProvider>
                    <AppRoot>
                        <SplitLayout
                            header={<PanelHeader separator={false} />}
                            style={{ justifyContent: "center" }}
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
                                                <Button size="l" stretched>
                                                    Авторизоваться
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
export default SignIn