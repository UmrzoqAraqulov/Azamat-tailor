import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
} from "antd";
import "./formStyle.scss";
import { useState } from "react";
import { useOrders } from "../states/orders";
import { request } from "../server/request";

const FormCustom = ({ page, pageLimit, search,selected,form,dropdownShow,setDropdownShow }) => {
  const { postOrder, getOrders,putOrder } = useOrders();
  const [dropdownData, setDropdownData] = useState([]);
  const [costumeValue, setCostumeValue] = useState();
  const [trouthersValue, setTrouthersValue] = useState();
  const [customerId, setCustomerId] = useState(null);
  const [jacketValue, setJacketValue] = useState();
  const order = {};

  const getProduct = () => {
    let res = "";
    res += costumeValue ? costumeValue : "";
    res += trouthersValue ? trouthersValue : "";
    res += jacketValue ? jacketValue : "";
    return res;
  };

  const setCustomer = (customerInfo) => {
    setCustomerId(customerInfo.id);
    form.setFieldValue("customer", customerInfo.customer);
    setDropdownShow(false);
  };

  const submit = async (values) => {
    if(selected){
      const id = selected;
      putOrder({ id ,values});
    }else{
      let arr = [];
      let res = { ...values };
      order.customerId = customerId;
      order.products = getProduct();
      delete res.customer;
      order.toPay = res.price;
      delete res.price;
      order.notes = res.notes ? res.notes : "";
      delete res.notes;
      order.priority = res.priority;
      delete res.priority;
      order.endDate = res.endDate;
      delete res.endDate;
      for (let i in res) {
        arr.push({ name: i, value: res[i] });
      }
      order.params = arr;
      postOrder(order);
    }
    getOrders({ page, pageLimit, search });
  };

  const onChangeCostume = (e) => {
    setCostumeValue(e.target.value);
  };
  const onChangeTrouthers = (e) => {
    setTrouthersValue(e.target.value);
  };
  const onChangeJacket = (e) => {
    setJacketValue(e.target.value);
  };

  const autoComplete = async (e) => {
    const text = e.target.value;
    if (text.length > 2) {
      try {
        setDropdownShow(true);
        const { data } = await request.post("orders/in_process", {
          searchText: text,
        });
        setDropdownData(data.page.items);
      } catch {
        console.log("Error");
      }
    } else {
      setDropdownShow(false);
    }
  };

  return (
    <div>
      <div className="modal-forms">
        <Form
          form={form}
          className=""
          onFinish={submit}
          initialValues={{ priority: false }}
        >
          <div className="addOrderModal">
            <div className="customerName">
              <label htmlFor="customer">Mijoz</label>
              <Form.Item
                name="customer"
                id="customer"
                hasFeedback
                onChange={autoComplete}
                rules={[
                  {
                    required: true,
                    message: "Iltimos Mijozni kiriting!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {dropdownShow ? (
                <ul className="customerDropdown">
                  {dropdownData?.map((el) => (
                    <li onClick={() => setCustomer(el)} key={el.id}>
                      {el.customer}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
            <div>
              <label htmlFor="endDate">Muddat</label>
              <Form.Item
                name="endDate"
                шв="endDate"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Iltimos Muddat sanasini kiriting!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div>
              <label htmlFor="price">Narx</label>
              <Form.Item
                name="price"
                hasFeedback
                id="price"
                rules={[
                  {
                    required: true,
                    message: "Iltimos Narxni kiriting!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="checkBox">
              <label htmlFor="priority">Ustuvorlik</label>
              <Form.Item name="priority" id="priority" valuePropName="checked">
                <Checkbox />
              </Form.Item>
            </div>
            <div>
              <label htmlFor="notes">Izoh</label>
              <Form.Item name="notes" id="notes">
                <Input.TextArea />
              </Form.Item>
            </div>
          </div>
          <div className="formSizes">
            <div>
              <div className="orderSizes">
                <label htmlFor="chest">{"Ko'krak"}</label>
                <Form.Item
                  name="chest"
                  min={4}
                  rules={[
                    {
                      required: true,
                      message: false,
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSizes">
                <label htmlFor="stomach">Qorin</label>
                <Form.Item
                  name="stomach"
                  id="stomach"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSizes">
                <label htmlFor="backFront">Oldi-orqa</label>
                <Form.Item
                  name="backFront"
                  id="backFront"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSizes">
                <label htmlFor="shoulder">Yelka</label>
                <Form.Item
                  name="shoulder"
                  id="shoulder"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSizes">
                <label htmlFor="arm">{"Qo'l"}</label>
                <Form.Item
                  name="arm"
                  id="arm"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSizes">
                <label htmlFor="lenHeight">Uzunligi</label>
                <Form.Item
                  name="lenHeight"
                  id="lenHeight"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSizes">
                <label htmlFor="waist">Bel</label>
                <Form.Item
                  name="waist"
                  id="waist"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSizes">
                <label htmlFor="bosom">{"Bo'ksa"}</label>
                <Form.Item
                  name="bosom"
                  id="bosom"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSizes">
                <label htmlFor="leg">Son</label>
                <Form.Item
                  name="leg"
                  id="leg"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSizes">
                <label htmlFor="knee">Tizza</label>
                <Form.Item
                  name="knee"
                  id="knee"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSizes">
                <label htmlFor="pocha">Pocha</label>
                <Form.Item
                  name="pocha"
                  id="pocha"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSizes">
                <label htmlFor="gulfik">Gulfik</label>
                <Form.Item
                  name="gulfik"
                  id="gulfik"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSizes">
                <label htmlFor="lenTrouthers">Uzunligi</label>
                <Form.Item
                  name="lenTrouthers"
                  id="lenTrouthers"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
            </div>
            <div>
              <div>
                <Radio.Group
                  onChange={onChangeCostume}
                  required
                  value={costumeValue}
                  className="kostumRadio"
                >
                  <Radio value="classicSuit">Классические костюмы</Radio>
                  <Radio value="dvubortnyKastum">Двубортные костюмы</Radio>
                  <Radio value="smoking">Смокинги</Radio>
                  <Radio value="odnobortniyKastyum">Однобортные костюмы</Radio>
                </Radio.Group>
              </div>
              <div>
                <div>
                  <Radio.Group
                    onChange={onChangeTrouthers}
                    value={trouthersValue}
                  >
                    <Radio value="classicTrouthers">Классические брюки</Radio>
                    <Radio value="karmanPoyas">Карманы, пояс</Radio>
                  </Radio.Group>
                </div>
                <div>
                  <Radio.Group onChange={onChangeJacket} value={jacketValue}>
                    <Radio value="jacket1">Жилеты</Radio>
                    <Radio value="jacket2">Жилеты</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
          <Form.Item>
            <Button htmlType="submit">Add</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

FormCustom.propTypes = {
  search: PropTypes.string,
  page: PropTypes.number,
  pageLimit: PropTypes.number,
  form:PropTypes.object,
  selected:PropTypes.number,
  dropdownShow:PropTypes.bool,
  setDropdownShow:PropTypes.func,
};

export default FormCustom;
