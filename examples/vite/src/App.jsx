import {Value as REValue, People, App as REApp } from 'reactive_essays';
import 'reactive_essays/styles/styles.css'

const App = () => {
  return (
	<REApp style={{padding: "100px"}}>
		<p>test</p>
		<People rows={5} columns={10} people={50} percentage={20} darkTheme={false} hasIcon={false}/>
		<People rows={5} columns={10} people={50} percentage={20} darkTheme={true} hasIcon={false}/>
		<People rows={5} columns={10} people={50} percentage={20} darkTheme={false} hasIcon={true}/>
		<People rows={5} columns={10} people={50} percentage={20} darkTheme={true} hasIcon={true}/>
		If I eat <REValue id="var1" unit="cookie" minvalue={1} maxvalue={1000} value={3} scalingrate={1} />, I will consume Placeholder. /
		{/* <REOutput var="var1" unit="calorie" getvalue={23} />. This is <REOutput var="var1" 
		getvalue={function (inputval) {
			// inputval
			return 23 * inputval - 2500;
		}} 
		getactualunit={(val) => {

			if (val > 0) {
			return AddS("calorie", val) + " over the daily recommended value"
			} else {
			return "";
			} 
			
		}} 
		getoutputtext={(val, unit) => {

			if (unit !== "") {
			return StyliseN(val) + " " + unit;
			} else {
			return "within the daily recommended calorie consumption"
			}
		}} />. */}
	</REApp>
  );
};

export default App;