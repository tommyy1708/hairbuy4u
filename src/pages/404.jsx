import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Missing(){
  return (
    <div className="missing">
      <div className="missing_content">
        <h2>Your Page missing</h2>
        <p>Click button return to home page.</p>
        <Link to={''}>
          <Button size="large" type="primary">
            <p>Back to Home</p>
          </Button>
        </Link>
      </div>
    </div>
  );
}

