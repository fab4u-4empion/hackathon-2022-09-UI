import { Group, PanelHeader, View, Panel, Button, FormLayout, FormItem, Input, FormLayoutGroup, DatePicker, Select, } from "@vkontakte/vkui"

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            purpose: "",
            showPatronym: true,
        };

        this.addressItems = [
            { label: "Город", name: "city" },
            { label: "Улица", name: "street" },
            { label: "Дом", name: "build" },
        ];

        this.onChange = this.onChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onChange(e) {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }

    onShowPatronym() {
        this.setState({ showPatronym: true });
    }

    onRemove(e) {
        this.setState({ showPatronym: false });
    }

    render() {
        const { email, purpose, showPatronym } = this.state;

        return (
            <View activePanel="new-user">
                <Panel id="new-user">
                    <PanelHeader>Регистрация</PanelHeader>
                    <Group>
                        <FormLayout>
                            <FormItem
                                top="E-mail"
                                status={email ? "valid" : "error"}
                                bottom={
                                    email
                                        ? "Электронная почта введена верно!"
                                        : "Пожалуйста, введите электронную почту"
                                }
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
                                    <Input />
                                </FormItem>
                            </FormLayoutGroup>

                            <FormItem top="Пароль">
                                <Input type="password" placeholder="Введите пароль" />
                            </FormItem>

                            <FormItem bottom="Пароль может содержать только латинские буквы и цифры.">
                                <Input type="password" placeholder="Повторите пароль" />
                            </FormItem>

                            <FormLayoutGroup>
                                <FormItem top="Номер телефона">
                                    <Input type="phone" placeholder="+375290000000" />
                                </FormItem>
                            </FormLayoutGroup>

                            <FormItem top="Дата рождения">
                                <DatePicker
                                    min={{ day: 1, month: 1, year: 1901 }}
                                    max={{ day: 31, month: 12, year: 2022 }}
                                    dayPlaceholder="ДД"
                                    monthPlaceholder="MM"
                                    yearPlaceholder="ГГ"
                                />
                            </FormItem>

                            <FormItem top="Пол">
                                <Select
                                    placeholder="Выберите пол"
                                    options={[
                                        {
                                            value: "1",
                                            label: "Мужской",
                                        },
                                        {
                                            value: "2",
                                            label: "Женский",
                                        },
                                        {
                                            value: "3",
                                            label: "Другой",
                                        },
                                    ]}
                                />
                            </FormItem>

                            {this.addressItems.map(({ label, name }) => (
                                <FormItem top={label} key={name}>
                                    <Input name={name} />
                                </FormItem>
                            ))}

                            <FormItem top="О себе">
                                <Textarea />
                            </FormItem>
                            <Checkbox>
                                Согласен со всем <Link>этим</Link>
                            </Checkbox>
                            <FormItem>
                                <Button size="l" stretched>
                                    Зарегистрироваться
                                </Button>
                            </FormItem>
                        </FormLayout>
                    </Group>
                </Panel>
            </View>
        );
    }
}

<Example />;