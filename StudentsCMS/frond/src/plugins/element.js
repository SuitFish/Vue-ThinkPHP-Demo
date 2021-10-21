import Vue from 'vue'
import {
    Aside,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Checkbox,
    CheckboxGroup,
    Container,
    Dialog,
    Form,
    FormItem,
    Header,
    Input,
    Main,
    Menu,
    MenuItem,
    Message,
    Pagination,
    Popconfirm,
    Radio,
    RadioGroup,
    Submenu,
    Table,
    TableColumn
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Popconfirm)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.prototype.$msg = Message
