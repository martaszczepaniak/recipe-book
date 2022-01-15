import {GetServerSideProps} from "next";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.recipe.findUnique({
    include: {
      ingredients: true,
    },
    where: {
      id: Number(params?.id) || -1,
    }
  });

  return {
    props: {post},
  };
};

export interface IIngredient {
  name: string
  amount: string
  unit: string
}


// @ts-ignore
const Recipe = ({post}) => {
  console.log(post)
  return (
    <div>
      <h1>{post.title}</h1>
      {post.ingredients.map((ingredient: IIngredient) => {
        return <p>- {ingredient.name} {ingredient.amount}{ingredient.unit}</p>
      })}
      <p>{post.content}</p>
    </div>
  )
}

export default Recipe;
