import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SearchOutlined } from '@ant-design/icons'
import { InputRef } from 'antd'
import { Button, Input, Space, Table } from 'antd'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { PlusOutlined } from '@ant-design/icons'

import axios from '../../utils/axios'

import * as S from './styles'

interface DataType {
  key: string
  documentNumber: string
  socialReason: string
  company: string
}

type DataIndex = keyof DataType

const Contracts = () => {
  const searchInput = useRef<InputRef>(null)
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const navigate = useNavigate()

  const handleSearch = (confirm: (param?: FilterConfirmProps) => void) => {
    confirm()
  }

  const handleReset = (
    clearFilters: () => void,
    confirm: (param?: FilterConfirmProps) => void
  ) => {
    clearFilters()
    confirm()
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }}
            onPressEnter={() => handleSearch(confirm)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters, confirm)}
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
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      )
    },
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
      ...getColumnSearchProps('company'),
      render: (company) => company.name
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        contracts.length >= 1 ? (
          <Button
            type="link"
            onClick={() => navigate(`/contract/${record.socialReason}`)}
          >
            Edit
          </Button>
        ) : null
    }
  ]

  useEffect(() => {
    const getContracts = async () => {
      setLoading(true)
      const { data } = await axios.get(`/contract?page=${currentPage}`)
      setContracts(data.contracts)
      setTotal(data.total)
      setLoading(false)
    }

    getContracts()
  }, [currentPage, setContracts])

  const onNavigate = (page: number) => {
    setCurrentPage(page)
    navigate(`/contracts?page=${page}`)
  }

  const goToContractPage = () => {
    navigate('/contract')
  }

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>Contracts</S.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={goToContractPage}
        >
          New Contract
        </Button>
      </S.Header>
      <Table
        loading={loading}
        columns={columns}
        dataSource={contracts}
        pagination={{
          pageSize: 5,
          total,
          onChange: (page) => {
            onNavigate(page)
          }
        }}
      />
    </S.Wrapper>
  )
}

export default Contracts
