import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

enum PConType {
  Alcohol,
  Egg,
  Corn
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  alcoholTimer: number | null = null;
  eggTimer: number | null = null;
  allTimer: number | null = null;
  instanceTimer: number | null = null;

  private readonly dangerBuffer = 5000;
  private readonly warningBuffer = 30000;
  private readonly tickLength = 100;
  private readonly alcoholRefreshTime = 2 * 60 * 1000;
  private readonly eggRefreshTime = 5 * 60 * 1000;
  private readonly allRefreshTime = 10 * 60 * 1000;

  private useBeeps = false;
  private silent = false;
  private stopAlcohol$ = new Subject<void>();
  private stopEgg$ = new Subject<void>();
  private stopAll$ = new Subject<void>();
  private stopInstance$ = new Subject<void>();

  private alcoholAudio = new Audio(`assets/timer_beep_1.wav`);
  private eggAudio = new Audio(`assets/timer_beep_2.wav`);
  private cornAudio = new Audio(`assets/timer_beep_3.wav`);

  constructor(private router: ActivatedRoute) {
    this.router.queryParams.subscribe(queryParams => {
      this.useBeeps = !!queryParams.beeps;
      this.silent = !!queryParams.silent;
    });

    try {
      (navigator as any).wakeLock.request('screen');
    } catch (error) {
      console.log('could not request wake lock');
    }
  }

  isDanger(time: number | null) {
    return time !== null && time <= this.dangerBuffer + 1000;
  }

  isWarning(time: number | null) {
    return time !== null && time <= this.warningBuffer + 1000;
  }

  startAlcohol() {
    this.stopAlcohol$.next();
    this.alcoholTimer = this.alcoholRefreshTime;

    this.createTimer(this.stopAlcohol$, this.alcoholRefreshTime, PConType.Alcohol).subscribe(timeLeft => {
      this.alcoholTimer = timeLeft;

      if (timeLeft <= 0) {
        this.startAlcohol();
      }
    });
  }

  stopAlcohol() {
    this.stopAlcohol$.next();
    this.alcoholTimer = null;
  }

  startEgg() {
    this.stopEgg$.next();
    this.eggTimer = this.eggRefreshTime;

    this.createTimer(this.stopEgg$, this.eggRefreshTime, PConType.Egg).subscribe(timeLeft => {
      this.eggTimer = timeLeft;

      if (timeLeft <= 0) {
        this.startEgg();
      }
    });
  }

  stopEgg() {
    this.stopEgg$.next();
    this.eggTimer = null;
  }

  startAll() {
    this.stopAll$.next();
    this.allTimer = this.allRefreshTime;

    this.createTimer(this.stopAll$, this.allRefreshTime, PConType.Corn).subscribe(timeLeft => {
      this.allTimer = timeLeft;

      if (timeLeft <= 0) {
        this.startAll();
      }
    });
  }

  stopAll() {
    this.stopAll$.next();
    this.allTimer = null;
  }

  startInstance() {
    if (this.instanceTimer === null) {
      const startTime = new Date().getTime();
      this.instanceTimer = -3000;

      interval(this.tickLength)
        .pipe(
          map(() => new Date().getTime() - startTime),
          takeUntil(this.stopInstance$)
        ).subscribe(elapsedMilliseconds => {
          this.instanceTimer = elapsedMilliseconds - 3000;
        });

      this.startEgg();
      this.startAll();
    }
  }

  stopInstance() {
    this.stopInstance$.next();
    this.instanceTimer = null;
  }

  private createTimer(stop$: Observable<void>, refreshTime: number, pconType: PConType) {
    const startTime = new Date().getTime();
    let state = 100;

    return interval(this.tickLength).pipe(
      map(() => new Date().getTime() - startTime),
      map(elapsedMilliseconds => refreshTime - elapsedMilliseconds),
      tap(timeLeft => {
        if (timeLeft < this.dangerBuffer + 1000) {
          const currentState = Math.floor(timeLeft / 1000);
          if (state > currentState) {
            if (this.useBeeps) {
              const audio =
                pconType === PConType.Alcohol ? this.alcoholAudio
                : pconType === PConType.Egg ? this.eggAudio
                : pconType === PConType.Corn ? this.cornAudio
                : null;
              if (audio && state === 100 && (!this.silent || pconType === PConType.Alcohol)) {
                audio.play();
                state = 0;
              }
            } else {
              const text =
                pconType === PConType.Alcohol ? 'Alkahol'
                : pconType === PConType.Egg ? 'Egg'
                : pconType === PConType.Corn ? 'Corn'
                : '';

              const speechText =
                state === 100 ? text
                : currentState > 0 ? `${currentState}`
                : 'pop ' + text;

              state = currentState;

              if (!this.silent || pconType === PConType.Alcohol) {
                const utterance = new SpeechSynthesisUtterance(speechText);
                utterance.rate = 2;
                utterance.lang = 'en-US';
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(utterance);
              }
            }

          }
        }
      }),
      takeUntil(stop$)
    );
  }
}
