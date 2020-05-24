import React, { useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
import Illustration from "./Illustration";
import { hasOverflow } from "./library";

function LooseEpidemie() {
  return (
    <div>
      <div className="card__img">
        <Illustration img="loss_epidemie" alt="Prohra z neschopnosti"/>
      </div>
      <h1>Epidemie se vymkla z rukou</h1>
      <p>
        Počty nakažených a zesnulých rostou exponenciálním tempem. Vojtík
        rezignoval, Rýmula někam zmizel, Jana Zdravá už dva týdny
        nevystrčila nos z nemocnice, Věra Pohlová se taky už podezřele
        dlouho neukázala v Albertu. Možná přijde kolektivní imunita, možná
        vědci vyvinou vakcínu či levný a rychlý způsob léčby; možná nastává
        éra jak z filmu Dvanáct opic. Jisté je pouze to, že jsi selhal.
      </p>
    </div>
  );
}

function LooseHealth() {
  return (
    <div>
      <div className="card__img">
        <Illustration img="loss_health" alt="Prohra ze zdravotních důvodů"/>
      </div>
      <h1>Zdravotní stav obyvatelstva je kritický</h1>
      <p>
        Boj s epidemií je sice udatný, ale Covid-19 není jediný zdravotní
        neduh, který může lidi potkat. Všudypřítomná deprese, odkládané
        operace, neléčená zranění, přecházené nemoci - to všechno se nakonec
        ukáže jako mnohem větší problém, než samotná virová epidemie. Lid
        umořený strachem a nepracujícím zdravotnictvím rezignuje na vyhlídky
        lepšího zítřka, nastávají temné časy.
      </p>
    </div>
  );
}

function LooseEconomy() {
  return (
    <div>
      <div className="card__img">
        <Illustration img="loss_economy" alt="Prohra z ekonomických důvodů"/>
      </div>
      <h1>Ekonomika zkolabovala</h1>
      <p>
        Urputný boj s epidemií bez ohledu na náklady přivodil ekonomický
        kolaps. Rekordní nezaměstnanost, obří schodek státního rozpočtu,
        miliony lidí zadlužených po uši, krachující firmy. Prosperující
        ekonomika je základem zdravé, odolné společnosti. Svými rozhodnutími
        jsi uvrhl společnost do dlouhého marasmu. Fronta na ilegální přechod
        hranic se vine až po Prachatice.
      </p>
    </div>
  );
}

function LooseTrust() {
  return (
    <div>
      <div className="card__img">
        <Illustration img="loss_trust" alt="Prohra z nedůvěry"/>
      </div>
      <h1>Konec demokracie</h1>
      <p>
        Svými chaotickými rozhodnutími jsi definitivně podryl důvěru lidí ve
        veřejné činitele a instituce. Vláda reaguje ještě větším utužením
        režimu a společnost je vrhnuta do dystopické noční můry. Vševidoucí
        Bakšišovo oko kontroluje, jestli mají občané roušku i ve spánku.
        Skupinka osvícených vytváří Autonomní zónu Holešovice. Václavu zpod
        Blaníka ale není umožněno vstoupit&hellip;
      </p>
    </div>
  );
}

function Win() {
  return (
    <div>
      <div className="card__img">
        <Illustration img="victory" alt="Vítězství!"/>
      </div>
      <h1>Epidemie je pod kontrolou</h1>
      <p>
        Občas se objeví pár nových případů, ale informovaný lid, funkční
        zdravotnictví a akceschopnost firem a dobrovolníků zajistily, že se
        nákaza již dále nešíří. Česká cesta se stává příkladem pro ostatní
        země. Svatý Václav je jmenován do čela Světové zdravotnické
        organizace.
      </p>
    </div>
  );
}

function Draw() {
  return (
    <div>
      <h1>
        Stokrát nic umořilo osla a tvé neproaktivní jednání jenom dopomohlo
        dalšímu šíření epidemie. Vládě došly síly, občané jsou v letargii nebo
        na lůžku.
      </h1>
    </div>
  );
}

export default function GameOver({ win, loose, draw }) {
  const gameOverEl = useRef(null);
  const [isOverFlow, setIsOverflow] = useState(false);
  useLayoutEffect(() => {
    setIsOverflow(hasOverflow(gameOverEl.current));
  }, [gameOverEl]);

  const gameOverClasses = classNames("game-over", { "game-over--overflow": isOverFlow });
  return (
    <div ref={gameOverEl} className={gameOverClasses}>
      {(loose === 1) ? <LooseEpidemie/> :
       (loose === 2) ? <LooseHealth/> :
       (loose === 3) ? <LooseEconomy/> :
       (loose === 4) ? <LooseTrust/> :
       win ? <Win/> :
       draw ? <Draw/> :
       null}
    </div>
  );
}
