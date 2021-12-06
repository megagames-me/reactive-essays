import {Value as REValue, People, App as REApp, Output as REOutput, AddS, StyliseN } from 'reactive_essays';
import 'reactive_essays/styles/styles.css'

const App = () => {
  return (
	<REApp style={{padding: "100px"}}>
		<p>test</p>
		<People rows={5} columns={10} people={50} percentage={20} darkTheme={false} hasIcon={false}/>
		<People rows={5} columns={10} people={50} percentage={20} darkTheme={true} hasIcon={false}/>
		<People rows={5} columns={10} people={50} percentage={20} darkTheme={false} hasIcon={true}/>
		<People rows={5} columns={10} people={50} percentage={20} darkTheme={true} hasIcon={true}/>
		If I eat <REValue id="var1" unit="chocolate chip cookie" minValue={1} maxValue={1000} value={3} scalingRate={1} />, I will consume <REOutput refs="var1" unit="calorie" getValue={78} sdf="sdf" />. This is <REOutput refs="var1" 
		getValue={function (inputvals) {
			return inputvals.var1 * 78 - 2500;
		}} 
		getActualUnit={(val) => {

			if (val > 0) {
				return AddS("calorie", val) + " over the daily recommended value"
			} else {
				return "";
			} 
			
		}} 
		getOutputText={(val, unit) => {

			if (unit !== "") {
				return StyliseN(val) + " " + unit;
			} else {
				return "within the daily recommended calorie consumption"
			}
		}} />.
	</REApp>
  );
};

export default App;