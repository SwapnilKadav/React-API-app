import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";

// Component's Base CSS
import "./Table.css";
function Table() {
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  // get posts
  const getPosts = () => {
    axios
      .get("http://localhost:8000/api/mixins/")
      .then((response) => {
        if (response.status === 200) {
          setPosts(response?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SORTERS = {
    NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
  };

  const getSorter = (data) => {
    const mapper = (x) => x[data.field];
    let sorter = SORTERS.STRING_ASCENDING(mapper);

    if (data.field === "id") {
      sorter =
        data.direction === "ascending"
          ? SORTERS.NUMBER_ASCENDING(mapper)
          : SORTERS.NUMBER_DESCENDING(mapper);
    } else {
      sorter =
        data.direction === "ascending"
          ? SORTERS.STRING_ASCENDING(mapper)
          : SORTERS.STRING_DESCENDING(mapper);
    }

    return sorter;
  };

  let count = posts.length;
  const service = {
    fetchItems: (payload) => {
      let result = Array.from(posts);
      result = result.sort(getSorter(payload.sort));
      return Promise.resolve(result);
    },
    create: (task) => {
        console.log(task);
      count += 1;
      posts.push({
        ...task,
        id: count,
      });
      return Promise.resolve(task);
    },
    update: (data) => {
      console.log(data);
      const task = posts.find((t) => t.id === data.id);
      task.title = data.title;
      task.description = data.description;
    },
    delete: (data) => {
      console.log(data.id);
      axios
        .delete(`http://localhost:8000/api/mixins/${data.id}`)
        .then((response) => this.setState());
    },
  };

  const styles = {
    container: { margin: "auto", width: "fit-content" },
  };
  return (
    <div style={styles.container}>
      <CRUDTable
        caption="posts"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="id" label="ID" hideInCreateForm />
          <Field name="product_name" label="Title" placeholder="product_name" />
          <Field
            name="prodcut_description"
            label="Description"
            hideInCreateForm
          />
          <Field name="product_price" label="Product Price" hideInCreateForm />
          <Field
            name="product_image"
            label="Images"
            hideInCreateForm
            type="img"
          />
        </Fields>
        <CreateForm
          title="Task Creation"
          message="Create a new task!"
          trigger="Create Task"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Please, provide task's title";
            }

            if (!values.description) {
              errors.description = "Please, provide task's description";
            }

            return errors;
          }}
        />

        <UpdateForm
          title="Task Update Process"
          message="Update task"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            const errors = {};

            if (!values.id) {
              errors.id = "Please, provide id";
            }

            if (!values.title) {
              errors.title = "Please, provide task's title";
            }

            if (!values.description) {
              errors.description = "Please, provide task's description";
            }

            return errors;
          }}
        />

        <DeleteForm
          title="Task Delete Process"
          message="Are you sure you want to delete the task?"
          trigger="Delete"
          onSubmit={(task) => service.delete(task)}
          submitText="Delete"
          validate={(values) => {
            const errors = {};
            if (!values.id) {
              errors.id = "Please, provide id";
            }
            return errors;
          }}
        />
      </CRUDTable>
    </div>
  );
}

export default Table;

Table.propTypes = {};

ReactDOM.render(<Table />, document.getElementById("root"));
