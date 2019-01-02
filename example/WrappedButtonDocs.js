import React from "react";
import PropTypes from 'prop-types';
import ButtonDocs from "./ButtonDocs";

export const WrappingComponent = ({ wrappingComponentId, children }) => (
  <div className={`WrappingComponent-${wrappingComponentId}`}>{children}</div>
);
WrappingComponent.propTypes = {
  wrappingComponentId: PropTypes.string
};

const wrapped = WrappedComponent =>
  class WrapperContext extends React.PureComponent {
    static displayName = `wrapped(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    static WrappedComponent = WrappedComponent;

    static derivedComponents = [WrappingComponent, WrappedComponent];

    static propTypes = WrappingComponent.propTypes;

    render() {
      const { ...rest } = this.props;

      return (
        <WrappingComponent>
          <WrappedComponent {...rest} />
        </WrappingComponent>
      );
    }
  };

export default wrapped(ButtonDocs);
