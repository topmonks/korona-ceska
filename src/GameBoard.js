import React, { useMemo } from "react";
import Card from "./Card";
import { getAnswerCardField, calculateMood } from "./library";
import { Link } from "react-navi";
import GameStory from "./GameStory";
import GameIncident from "./GameIncident";

export default function GameBoard({ G, ctx, moves, events, reset }) {
  const { values, card, answer, incident } = G;
  const mood = useMemo(() => calculateMood(values), [values]);

  const { loose, win, draw } = ctx.gameover || {};

  const handleAnswer = (answer = false) => () => {
    moves.MakeAnswer(answer);
  };

  const handleContinue = () => {
    events.endTurn();
  };

  const handleNewGame = () => {
    reset();
  };

  const answerButton = (answer) => (
    <button className="button__answer" onClick={handleAnswer(answer)}>
      {getAnswerCardField(card, answer, "answer")}
    </button>
  );

  return (
    <div className={`game-board game-board--${mood}`}>
      <div className="game-board__attributes">
        <p>
          <small>{ctx.turn}. kolo</small> = {JSON.stringify(values)}
        </p>
      </div>

      {ctx.phase === 'newbie' && (
        <GameStory
          onFinish={moves.FinishTutorial}
        />
      )}


      {ctx.phase === 'incident' && (
        <GameIncident
          {...incident}
          onConfirm={moves.MakeAcknowledge}
        />
      )}


      {ctx.gameover && (
        <div className="game-board__gameover">
          {win && (
            <div>
              <h1>Epidemie je pod kontrolou</h1>
              <p>
                Občas se objeví pár nových případů, ale informovaný lid, funkční
                zdravotnictví a akceschopnost firem a dobrovolníků zajistily, že
                se nákaza již dále nešíří. Česká cesta se stává příkladem pro
                ostatní země. Svatý Václav je jmenován do čela Světové
                zdravotnické organizace.
              </p>
            </div>
          )}
          {loose === 1 && (
            <div>
              <h1>Epidemie se vymkla z rukou</h1>
              <p>
                Počty nakažených a zesnulých rostou exponenciálním tempem.
                Vojtík rezignoval, Rýmula někam zmizel, Jana Zdravá už dva týdny
                nevystrčila nos z nemocnice, Věra Pohlová se taky už podezřele
                dlouho neukázala v Albertu. Možná přijde kolektivní imunita,
                možná vědci vyvinou vakcínu či levný a rychlý způsob léčby;
                možná nastává éra jak z filmu Dvanáct opic. Jisté je pouze to,
                že jsi selhal.{" "}
              </p>
            </div>
          )}
          {loose === 2 && (
            <div>
              <h1>Zdravotní stav obyvatelstva je kritický</h1>
              <p>
                Boj s epidemií je sice udatný, ale Covid-19 není jediný
                zdravotní neduh, který může lidi potkat. Všudypřítomná deprese,
                odkládané operace, neléčená zranění, přecházené nemoci - to
                všechno se nakonec ukáže jako mnohem větší problém, než samotná
                virová epidemie. Lid umořený strachem a nepracujícím
                zdravotnictvím rezignuje na vyhlídky lepšího zítřka, nastávají
                temné časy.
              </p>
            </div>
          )}
          {loose === 3 && (
            <div>
              <h1>Ekonomika zkolabovala</h1>
              <p>
                Urputný boj s epidemií bez ohledu na náklady přivodil ekonomický
                kolaps. Rekordní nezaměstnanost, obří schodek státního rozpočtu,
                miliony lidí zadlužených po uši, krachující firmy. Prosperující
                ekonomika je základem zdravé, odolné společnosti. Svými
                rozhodnutími jsi uvrhl společnost do dlouhého marasmu. Fronta na
                ilegální přechod hranic se vine až po Prachatice.
              </p>
            </div>
          )}
          {loose === 4 && (
            <div>
              <h1>Konec demokracie</h1>
              <p>
                Svými chaotickými rozhodnutími jsi definitivně podryl důvěru
                lidí ve veřejné činitele a instituce. Vláda reaguje ještě větším
                utužením režimu a společnost je vrhnuta do dystopické noční
                můry. Vševidoucí Bakšišovo oko kontroluje, jestli mají občané
                roušku i ve spánku. Skupinka osvícených vytváří Autonomní zónu
                Holešovice. Václavu zpod Blaníka ale není umožněno vstoupit...
              </p>
            </div>
          )}
          {draw && (
            <h1>
              Stokrát nic umořilo osla a tvé neproaktivní jednání jenom
              dopomohlo dalšímu šíření epidemie. Vládě došly síly, občané jsou v
              letargii nebo na lůžku.
            </h1>
          )}
        </div>
      )}

      {card && (
        <div className="game-board__card">
          <Card {...{ card, answer }} />
        </div>
      )}

      {!ctx.gameover && (
        <div className="game-board__buttons">
          {answer === null && (
            <>
              {answerButton(true)}
              {answerButton(false)}
            </>
          )}
          {answer !== null && (
            <button className="button__default" onClick={handleContinue}>
              Pokračovat
            </button>
          )}
        </div>
      )}

      {ctx.gameover && (
        <div className="game-board__buttons">
          <button className="button__default" onClick={handleNewGame}>Nová hra</button>
          <Link href="/">Zpet na menu</Link>
        </div>
      )}
    </div>
  );
}
