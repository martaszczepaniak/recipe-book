import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma';
import {IIngredient} from "pages/recipe/[id]";

export const getServerSideProps: GetStaticProps = async () => {
  const feed = await prisma.recipe.findMany();

  const filteredRecipes = await prisma.recipe.findMany({
    where: {
      ingredients: {
        some: {
          name: {
            contains: 'eggs',
          },
        },
      },
    },
  });

  return { props: { feed, filteredRecipes } };
};

// @ts-ignore
const Home = ({feed, filteredRecipes}) => {
  console.log(filteredRecipes)
  return (
    <div className={styles.container}>
      <Head>
        <title>My Recipe Book</title>
        <meta name="description" content="Best recipes on the planet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my Recipe Book!
        </h1>
        <div className="mt-10">
        {feed.map((recipe: any)=> {
          return (
            <div key={`${recipe.id}`} className="mt-2">
              <h1><a href={`/recipe/${recipe.id}`}>{recipe.title}</a></h1>
            </div>
          )
        })}
        </div>
        <p>Z jajkami:</p>
        {filteredRecipes.map((recipe: any) => {
          return <div key={`${recipe.id}`} className="mt-2">
            <h1><a href={`/recipe/${recipe.id}`}>{recipe.title}</a></h1>
          </div>
        })}
      </main>
    </div>
  )
}

export default Home
