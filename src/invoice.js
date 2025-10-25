import { initialRender } from "./initialRender";
import listener from "./listener";

class Invoice {
    init(){
        initialRender();
        console.log("init");
        listener();
    }
}

export default Invoice;