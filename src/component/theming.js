import React from "react";
import { Button } from "react-bootstrap";

class Theming extends React.Component {
  render() {
    return (
      <div>
        <style type="text/css">
          {`
            .btn-flat {
              background-color: purple;
              color: white;
            }

            .btn-xxl {
              padding: 1rem 1.5rem;
              font-size: 1.5rem;
            }
            `}
        </style>

        <Button variant="flat" size="xxl">
          flat button
        </Button>
      </div>
    );
  }
}

export default Theming;
