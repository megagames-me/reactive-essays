import { People, App as REApp, Value as REValue } from 'reactive_essays';

const App = () => {
  return (
    <REApp>
		<People rows={5} columns={10} people={50} percentage={20} darkTheme={false} hasIcon={false}/>
		<People rows={5} columns={10} people={50} percentage={20} darkTheme={true} hasIcon={false}/>
		<People rows={5} columns={10} people={50} percentage={20} darkTheme={false} hasIcon={true}/>
		<People rows={5} columns={10} people={50} percentage={20} darkTheme={true} hasIcon={true}/>
		<REValue id="cooltest" value={3}></REValue>
    </REApp>
  );
};

export default App;