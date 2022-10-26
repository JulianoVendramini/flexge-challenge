/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, DatePickerProps, InputRef } from 'antd'
import { Button, Form, Input, Table } from 'antd'
import type { FormInstance } from 'antd/es/form'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProductProps } from '../../types/api'
import { useSelector, useDispatch } from 'react-redux'

import * as S from './styles'
import { addProduct, useProducts } from '../../redux/sliceProducts'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface Item {
  key: string
  name: string
  amount: number
  finalUnityPrice: number
  installments: number
  paidInstallments: number
  begginingTerm: string
}

interface EditableRowProps {
  index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

type EditableTableProps = Parameters<typeof Table>[0]

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

type Props = {
  products: ProductProps[]
}

const Products = ({ products }: Props) => {
  const { socialReason } = useParams()
  const productsRedux = useSelector(useProducts)
  const [form] = Form.useForm()

  const dispatch = useDispatch()

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean
    dataIndex: string
  })[] = [
    {
      title: 'name',
      dataIndex: 'name',
      editable: true
    },
    {
      title: 'amount',
      dataIndex: 'amount'
    },
    {
      title: 'finalUnityPrice',
      dataIndex: 'finalUnityPrice'
    },
    {
      title: 'installments',
      dataIndex: 'installments'
    },
    {
      title: 'paidInstallments',
      dataIndex: 'paidInstallments'
    },
    {
      title: 'begginingTerm',
      dataIndex: 'begginingTerm'
    }
  ]

  const handleAdd = async () => {
    const values = await form.validateFields()

    const begginingTerm = moment(values.begginingTerm).format('YYYY-MM-DD')

    const newProduct = {
      ...values,
      begginingTerm
    }

    if (values) {
      dispatch(addProduct(newProduct))
    }
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }

  const handleSave = (row: ProductProps) => {
    const newData = [...productsRedux]
    const index = newData.findIndex((item) => row._id === item._id)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row
    })
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: ProductProps) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    }
  })

  return (
    <>
      <S.Wrapper form={form} layout="vertical">
        <S.Header>
          <S.Title>Contract&apos;s Product</S.Title>
          <Button onClick={handleAdd} type="primary" disabled={!!socialReason}>
            Add product
          </Button>
        </S.Header>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input disabled={!!socialReason} />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input disabled={!!socialReason} />
        </Form.Item>
        <Form.Item
          label="finalUnityPrice"
          name="finalUnityPrice"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input disabled={!!socialReason} />
        </Form.Item>
        <Form.Item
          label="Installments"
          name="installments"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input disabled={!!socialReason} />
        </Form.Item>
        <Form.Item
          label="Paid Installments"
          name="paidInstallments"
          rules={[{ required: true, message: 'Please fill this field!' }]}
        >
          <S.Input disabled={!!socialReason} />
        </Form.Item>
        <Form.Item label="Beggining Term" name="begginingTerm">
          <DatePicker onChange={onChange} />
        </Form.Item>
      </S.Wrapper>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={products || productsRedux}
        columns={columns as ColumnTypes}
      />
    </>
  )
}

export default Products
