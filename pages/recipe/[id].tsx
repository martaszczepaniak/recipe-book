import {GetServerSideProps, NextPage} from "next";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.recipe.findUnique({
    where: {
      id: Number(params?.id) || -1,
    }
  });

  return {
    props: {post},
  };
};

// @ts-ignore
const Recipe = ({post}) => {
  return (
    <div>
      <h1>{post.id}</h1>
      <p>{post.content}</p>
    </div>
  )
}

export default Recipe;
