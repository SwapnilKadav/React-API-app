import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "/home/swapnil/ReactJS/my-app/src/Home/Table.css"
export const PostsMain = () => {
  const [posts, setPosts] = useState([]);
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

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
    },
    {
      name: "Prodcut Description",
      selector: (row) => row.prodcut_description,
    },
    {
      name: "Product Price",
      selector: (row) => row.product_price,
    },
    {
      name: "Product Image",
      selector: (row) => <img width={50} height={50} src={row.product_image} />,
    },
  ];

  const styles = {
    container: { margin: "auto", width: "fit-content" },
  };

  return (
    <div style={styles.container}>
    <DataTable
      title="Product List"
      columns={columns}
      data={posts}
      pagination
      fixedHeaderScrollHeight="450px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      subHeader
      >

    </DataTable>
      </div>
  );

  {/* // <div className="container my-4">
  //   <div className="row">
  //     <div className="col-xl-6">
  //       <h4 className="fw-bold">API Handing Using React Hooks</h4>
  //     </div>
  //   </div>

  //   <table className="table table-striped my-5">
  //     <thead>
  //       <tr>
  //         <th>Id</th>
  //         <th>product_name</th>
  //         <th>prodcut_description</th>
  //         <th>product_price</th>
  //         <th>product_image</th>
  //       </tr>
  //     </thead>

  //     <tbody>
  //       {posts &&
  //         posts.map((post) => (
  //           <tr>
  //             <td> {post?.id} </td>
  //             <td> {post?.product_name} </td>
  //             <td> {post?.prodcut_description} </td>
  //             <td> {post?.product_price} </td>
  //             <td>
  //               <img src={post?.product_image} alt="car" width={250} height={250}/>
  //             </td>
  //           </tr>
  //         ))}
  //     </tbody>
  //   </table>
  // </div> */}
};
