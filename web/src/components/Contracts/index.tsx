import { SearchOutlined } from '@ant-design/icons'
import { InputRef, Modal } from 'antd'
import { Button, Input, Space, Table } from 'antd'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import React, { useRef, useState } from 'react'

import { PlusOutlined } from '@ant-design/icons'

interface DataType {
  key: string
  documentNumber: string
  socialReason: string
  company: string
}

type DataIndex = keyof DataType

const data: DataType[] = [
  {
    key: '1',
    documentNumber: 'string',
    socialReason: 'number',
    company: 'string'
  },
  {
    key: '2',
    documentNumber: 'string',
    socialReason: 'number',
    company: 'string'
  },
  {
    key: '3',
    documentNumber: 'string',
    socialReason: 'number',
    company: 'string'
  },
  {
    key: '4',
    documentNumber: 'string',
    socialReason: 'number',
    company: 'string'
  }
]

import * as S from './styles'
import ContractForm from '../ContractForm'

const Contracts = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const searchInput = useRef<InputRef>(null)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    }
  })

  const columns: ColumnsType<DataType> = [
    {
      title: 'Document Number',
      dataIndex: 'documentNumber',
      key: 'documentNumber',
      width: '15%',
      ...getColumnSearchProps('documentNumber')
    },
    {
      title: 'Social Reason',
      dataIndex: 'socialReason',
      key: 'socialReason',
      ...getColumnSearchProps('socialReason')
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      ...getColumnSearchProps('company')
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend']
    }
  ]

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <ContractForm />
      </Modal>
      <S.Wrapper>
        <S.Header>
          <S.Title>Contracts</S.Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            New Contract
          </Button>
        </S.Header>
        <Table columns={columns} dataSource={data} />
      </S.Wrapper>
    </>
  )
}

export default Contracts
