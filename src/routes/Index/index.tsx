import React from 'react'
import { useIntl } from 'react-intl'
import { ParentComponent } from 'components/ParentComponent'
import 'App.css'

const Index: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <div className="App">
      <ParentComponent />
    </div>
  );
}

export default Index
