import React from "react";
import marked from "marked";
import "!style-loader!css-loader!github-markdown-css/github-markdown.css";

import generateMarkdown from "./components/generateMarkdown";
import PropTable from "./components/PropTable";

import { EVENT_ID } from "./constants";

const styles = {
  base: {
    boxSizing: "border-box"
  }
};

export default class DocPanel extends React.Component {
  state = { docgen: null };
  constructor(props) {
    super(props);

    this._listener = d => {
      this.setState({ docgen: d.docgen });
    };
  }

  componentDidMount() {
    this.props.channel.on(EVENT_ID, this._listener);
  }

  componentWillUnmount() {
    this.props.channel.removeListener(EVENT_ID, this._listener);
  }

  render() {
    const { docgen } = this.state;
    if (!docgen) {
      return null;
    }
    const md = generateMarkdown({
      displayName: docgen.displayName,
      description: docgen.description
    });
    const html = marked(md);

    const propDefinitions = docgen.props ? Object.keys(docgen.props).map(
          key => {
            const prop = docgen.props[key];
            return {
              property: key,
              propType: prop.type,
              required: prop.required,
              description: prop.description,
              defaultValue: prop.defaultValue
                ? prop.defaultValue.value || "COMPUTED"
                : undefined
            };
          }
        ) : [];

    return (
      <div
        style={styles.base}
        className="markdown-body">
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <h2>Props</h2>
        <PropTable
          type={() => "abc"}
          propDefinitions={propDefinitions}
          maxPropObjectKeys={3}
          maxPropArrayLength={3}
          maxPropStringLength={50}
        />
      </div>
    );
  }
}
