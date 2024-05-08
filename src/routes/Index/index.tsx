import React from 'react'
import { useIntl } from 'react-intl'
import { DropdownMonth } from 'components/DropdownMonth' 
import { Layout } from 'components/Layout' 
import 'App.css'

const Index: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <div className="App">
     <Layout />
    </div>
  );
}

export default Index
