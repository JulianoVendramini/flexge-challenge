/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Products from '../Products'

import moment from 'moment'
import { Button, DatePicker, DatePickerProps, Form, message } from 'antd'
import { Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { CompanyProps, ContractProps } from '../../types/api'
import axios from '../../utils/axios'
import { countries, states } from '../../utils/constants'
import { resetProducts, useProducts } from '../../redux/sliceProducts'

import * as S from './styles'

const { Option } = Select

interface Item {
  key: string
  name: string
  age: number
  address: string
}

const originData: Item[] = []
for (let i = 0; i < 10; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}

const ContractForm = () => {
  const { socialReason } = useParams()
  const [form] = Form.useForm()
  const [companies, setCompanies] = useState<CompanyProps[]>([])
  const [contract, setContract] = useState<ContractProps>({} as ContractProps)
  const products = useSelector(useProducts)
  const dispatch = useDispatch()

  const isCountrySelected = !!Form.useWatch('country', form)

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }

  const handleSubmit = async (values: any) => {
    if (!values) {
      message.error('Please fill the form')
      return
    }
    if (!socialReason && products.length === 0) {
      message.error('Please add at least one product')
      return
    }

    const normalizedFormValues = {
      ...values,
      products
    }

    if (socialReason) {
      await axios.put(`/contract/${socialReason}`, normalizedFormValues)
      message.success('Contract updated successfully')
      return
    }

    try {
      await axios.post('/contract', normalizedFormValues)
      message.success('Contract created successfully')
      dispatch(resetProducts())
      form.resetFields()
    } catch (error) {
      message.error(
        'Contract Already Exists, please change the document number'
      )
      console.log('error', error)
    }
  }

  const getCompanies = async () => {
    const response = await axios.get('/company')

    setCompanies(response.data)
  }

  useEffect(() => {
    getCompanies()
  }, [form])

  useEffect(() => {
    const getContract = async () => {
      const response = await axios.get(`/contract/${socialReason}`)

      const normalizedData = {
        ...response.data,
        contractStartDate: moment(response.data.contractStartsIn),
        contractEndDate: moment(response.data.contractEndsIn),
        contractDueDate: moment(response.data.dueDay),
        company: response.data.company.name
      }
      form.setFieldsValue(normalizedData)

      setContract(response.data)
    }

    if (socialReason) {
      getContract()
    }
  }, [form, socialReason])

  return (
    <S.Container>
      <Button
        type="primary"
        style={{
          position: 'fixed',
          top: '12px',
          left: '12px'
        }}
      >
        <Link to="/contracts">Back</Link>
      </Button>
      {socialReason && <S.Title>Editing {contract.socialReason}</S.Title>}
      <S.Wrapper layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <Select style={{ width: 180 }} onChange={handleChange}>
            {countries.map((country) => (
              <Option key={country.value} value={country.value}>
                {country.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <Select
            style={{ width: 180 }}
            onChange={handleChange}
            disabled={!isCountrySelected}
          >
            {states.map((state) => (
              <Option key={state.value} value={state.value}>
                {state.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input />
        </Form.Item>
        <Form.Item
          label="Document Number"
          name="documentNumber"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input />
        </Form.Item>
        <Form.Item
          label="Social Reason"
          name="socialReason"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input />
        </Form.Item>
        <Form.Item
          label="District"
          name="district"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input />
        </Form.Item>
        <Form.Item
          label="Number"
          name="number"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input />
        </Form.Item>
        <Form.Item
          label="Zip Code"
          name="zipCode"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input />
        </Form.Item>
        <Form.Item
          label="Contract starts in"
          name="contractStartDate"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>
        <Form.Item
          label="Contract ends in"
          name="contractEndDate"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>
        <Form.Item
          label="Due day"
          name="contractDueDate"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>
        <Form.Item
          label="Company"
          name="company"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <Select
            style={{ width: 120 }}
            onChange={handleChange}
            disabled={!!socialReason}
          >
            {companies.map((company) => (
              <Option key={company._id} value={company._id}>
                {company.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <S.Divider />
      </S.Wrapper>
      <Products products={contract.products} />
      <S.ButtonWrapper>
        <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
          Submit
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  )
}

export default ContractForm
