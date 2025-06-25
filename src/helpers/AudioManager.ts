class AudioManager {
  private static instance: AudioManager;
  private audioRefs: { [key: string]: HTMLAudioElement | null } = {};
  private audioEnabled: boolean;

  private constructor() {
    this.audioEnabled = false;
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  initializeAudio() {
    if (typeof window !== 'undefined') {
      this.audioRefs['background'] = new Audio('/music/zewa_main_theme.mp3');
      this.audioRefs['click'] = new Audio('/music/click.mp3');
      this.audioRefs['game1'] = new Audio('/music/zewa_namotay.mp3');
      this.audioRefs['game2'] = new Audio('/music/zewa_otryvaysa.mp3');
      this.audioRefs['game3'] = new Audio('/music/zewa_poymai_vse_prizy.mp3');
      this.audioRefs['laugh'] = new Audio('/music/laugh.wav');
      this.audioRefs['oOw'] = new Audio('/music/o-ow.wav');
      this.audioRefs['brrr'] = new Audio('/music/brrr.wav');
      this.audioRefs['uguh'] = new Audio('/music/uguh.wav');
      this.audioRefs['cutPaper'] = new Audio('/music/cut-paper.mp3');
      this.audioRefs['toiletPaper'] = new Audio('/music/toilet_paper.mp3');

      // Установка настроек для каждого аудио
      Object.entries(this.audioRefs).forEach(([key, audio]) => {
        if (audio) {
          audio.preload = 'auto';
          // Фоновая музыка и музыка игр должны повторяться бесконечно
          if (['background', 'game1', 'game2', 'game3'].includes(key)) {
            audio.loop = true;
          }
        }
      });
    }
  }

  setAudioEnabled(enabled: boolean) {
    this.audioEnabled = enabled;
    if (!enabled) {
      this.stopAll();
    }
  }

  play(audioKey: string, volume = 1) {
    if (!this.audioEnabled) return;
    const audio = this.audioRefs[audioKey];
    if (audio) {
      audio.volume = volume;
      audio.play().catch((error) => console.error(`Failed to play audio ${audioKey}:`, error));
    }
  }

  stop(audioKey: string) {
    const audio = this.audioRefs[audioKey];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  stopAll() {
    Object.keys(this.audioRefs).forEach((audioKey) => this.stop(audioKey));
  }

  playBackgroundMusic() {
    this.play('background', 0.25);
  }

  stopBackgroundMusic() {
    this.stop('background');
  }

  playGameMusic(gameId: number) {
    const gameKey = `game${gameId}`;
    this.play(gameKey, 0.25);
  }

  stopGameMusic() {
    ['game1', 'game2', 'game3'].forEach((gameKey) => this.stop(gameKey));
  }

  playClickSound() {
    this.play('click', 0.35);
  }

  playLaughSound() {
    this.play('laugh');
  }
  playoOwSound() {
    this.play('oOw');
  }
  playBrrSound() {
    this.play('brrr');
  }
  playUguhSound() {
    this.play('uguh');
  }
  playCutPaperSound() {
    this.play('cutPaper', 0.3);
  }
  playToiletPaperSound() {
    this.play('toiletPaper', 0.5);
  }
  stopToiletPaperSound() {
    this.stop('toiletPaper');
  }
}

export default AudioManager.getInstance();
