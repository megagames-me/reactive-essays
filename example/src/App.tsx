import React from 'react';
import { REValue, REOutput, REApp, AddS, StyliseN } from 'typescript-react-test';
import 'typescript-react-test/lib/css/recomponents.css';

function App() {
  return (
    <REApp style={{padding: "100px"}}>
      If I eat <REValue id="var1" unit="cookie" minvalue={1} maxvalue={1000} value={3} scalingrate={1} />, I will consume <REOutput var="var1" unit="calorie" getvalue={23} />. This is <REOutput var="var1" 
      getvalue={function (inputval: number): number {
        // inputval
        return 23 * inputval - 2500;
      }} 
      getactualunit={(val): string => {

        if (val > 0) {
          return AddS("calorie", val) + " over the daily recommended value"
        } else {
          return "";
        } 
        
      }} 
      getoutputtext={(val, unit): string => {

        if (unit !== "") {
          return StyliseN(val) + " " + unit;
        } else {
          return "within the daily recommended calorie consumption"
        }
      }} />.
    </REApp>
  );
}

export default App;