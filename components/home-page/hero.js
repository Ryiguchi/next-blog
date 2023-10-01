import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/tamela.jpg"
          alt="Tamela"
          width="300"
          height="300"
        />
      </div>
      <h1>Hi, I'm Tamela</h1>
      <p>I blog about music - especially latin American and Swedish music.</p>
    </section>
  );
}

export default Hero;
