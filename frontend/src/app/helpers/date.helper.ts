/* eslint-disable */
export class DateHelper {
  static months: Array<string> = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  static daysOfWeek: Array<string> = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  static daysOfWeekComplete: Array<string> = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  static readonly validateHourRegex: RegExp = new RegExp(
    "^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
  );
  static readonly hourMask: Array<any> = [
    /[0-9]/,
    /[0-9]/,
    ":",
    /[0-9]/,
    /[0-9]/,
  ];
  /**
   * @static
   * Adiciona um zero a esquerda em números menores que 10
   * @returns {string} Texto tratado com duas casas.
   */
  static addLeftZero = (value: number): string =>
    value < 10 ? `0${value}` : `${value}`;
  /**
   * @static
   * Formata data para exibição da hora
   * @param {Date} date Data que será formatada
   * @returns {string} Texto com hora formatada
   */
  static formatHour = (date: Date): string =>
    `${DateHelper.addLeftZero(date.getHours())}:${DateHelper.addLeftZero(
      date.getMinutes()
    )}`;
  /**
   * @static
   * Formata data para exibição da hora com segundos
   * @param {Date} date Data que será formatada
   * @returns {string} Texto com hora formatada com segundos
   */
  static formatHourWithSeconds = (date: Date): string =>
    `${DateHelper.addLeftZero(date.getHours())}:${DateHelper.addLeftZero(
      date.getMinutes()
    )}:${DateHelper.addLeftZero(date.getSeconds())}`;

  /**
   * @static
   * Transforma uma data para um dia da semana no formato texto
   * @param {Date} date Data recebida
   * @returns {string} Dia da semana no formato texto
   */
  static getDayOfWeek = (date: Date): string =>
    DateHelper.daysOfWeek[date.getDay()];
  /**
   * @static
   * Transforma uma data para um dia da semana completo no formato texto
   * @param {Date} date Data recebida
   * @returns {string} Dia da semana completo no formato texto
   */
  static getDayOfWeekComplete = (date: Date): string =>
    DateHelper.daysOfWeekComplete[date.getDay()];
  /**
   * @static
   * Ignora os milisegundos de uma hora no formato texto
   * @param {string} hours Horas no formato texto
   * @returns {string} Horas formatadas
   */
  static ignoreMiliseconds = (hours: string): string => hours.slice(0, 8);
  /**
   * @static
   * Ignora os segundos de uma hora no formato texto
   * @param {string} hours Horas no formato texto
   * @returns {string} Horas formatadas
   */
  static ignoreSeconds = (hours: string): string => hours.slice(0, 5);
  /**
   * @static
   * Faz a formatação de segundos para horas no formato
   * @param {number} seconds Segundos que serão convertidos
   * @param {boolean} withSeconds Informa se deseja que sejam inseridos tambem os segundos na resposta
   * @returns {any} Horas formatadas
   */
  static secondsToHours(seconds: number, withSeconds?: boolean): any {
    let isNegative: boolean = seconds < 0;
    if (isNegative) seconds = seconds * -1;
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let resultSeconds = Math.floor((seconds % 3600) / 60 / 60);
    if (withSeconds)
      return isNegative
        ? {
            hours: hours * -1,
            minutes: DateHelper.addLeftZero(minutes),
            seconds: DateHelper.addLeftZero(resultSeconds),
          }
        : {
            hours: hours,
            minutes: DateHelper.addLeftZero(minutes),
            seconds: DateHelper.addLeftZero(resultSeconds),
          };
    return isNegative
      ? {
          hours: hours * -1,
          minutes: DateHelper.addLeftZero(minutes),
        }
      : {
          hours: hours,
          minutes: DateHelper.addLeftZero(minutes),
        };
  }

  /**
   * @static
   * Faz a formatação de horas para segundos no formato
   * @param {string} hours Horas que serão convertidas
   * @returns {any} Horas formatadas
   */
  static hoursToSeconds(hours: string): any {
    const separateHours = hours.split(":");
    let newHours = parseInt(separateHours[0]);
    let minutes = parseInt(separateHours[1]);
    let isNegative: boolean = newHours < 0;
    if (isNegative) newHours = newHours * -1;
    let resultSeconds = Math.floor(newHours * 3600 + minutes * 60);

    if (isNegative) return resultSeconds * -1;
    else return resultSeconds;
  }

  /**
   * @static
   * Trata a data para que fique no formato adequado
   * @param {Date} date Data que será tratada
   * @returns {string} Texto com a data já tratada.
   */
  static treatDate = (date: Date): string =>
    `${DateHelper.addLeftZero(date.getDate())} de ${
      DateHelper.months[date.getMonth()]
    } de ${date.getFullYear()}`;
  /**
   * @static
   * Trata a data para que fique no formato adequado e resumido
   * @param {Date} date Data que será tratada
   * @returns {string} Texto com a data já tratada.
   */
  static treatDateResumed = (date: Date): string =>
    `${DateHelper.addLeftZero(date.getDate())}/${DateHelper.addLeftZero(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
  /**
   * @static
   * Trata a data para exibir no input
   * @param {any} date Data que será tratada
   * @returns {string} Texto com a data já tratada.
   */
  static treatDateForInput = (date: any): string =>
    date instanceof Date
      ? `${date.getFullYear()}-${DateHelper.addLeftZero(
          date.getMonth() + 1
        )}-${DateHelper.addLeftZero(date.getDate())}`
      : "";

  /**
   * @static
   * Trata a data para que fique no formato adequado e resumido
   * @param {string} date Data que será tratada
   * @returns {string} Texto com a data já tratada.
   */
  static treatDateResumedForDatabase = (date: string): string =>
    date.split("/")[0].length === 2
      ? `${date.slice(6, 10)}-${date.slice(3, 5)}-${date.slice(0, 2)}`
      : date;

  /**
   * @static
   * Trata a data para que fique no formato adequado e resumido
   * @param {string} date Data que será tratada
   * @returns {string} Texto com a data já tratada.
   */
  static treatDateResumedWithHoursForDatabase = (date: string): string =>
    `${date.slice(6, 10)}-${date.slice(3, 5)}-${date.slice(0, 2)}${date.slice(
      10,
      19
    )}`;

  /**
   * @static
   * Trata a data para que fique no formato resumido vinda do banco de dados
   * @param {string} date Data que será tratada
   * @returns {string} Texto com a data já tratada.
   */
  static treatDateResumedFromDatabase = (date: string): string =>
    date.indexOf("/") === -1
      ? `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`
      : date;

  /**
   * @static
   * Trata a data para que fique no formato adequado e resumido e com ano resumido também
   * @param {Date} date Data que será tratada
   * @returns {string} Texto com a data já tratada.
   */
  static treatDateResumedShortYear = (date: Date): string => {
    let year: string = date.getFullYear().toString();
    let yearResumed: string = year.slice(2, 4);
    return `${DateHelper.addLeftZero(date.getDate())}/${DateHelper.addLeftZero(
      date.getMonth() + 1
    )}/${yearResumed}`;
  };
  /**
   * @static
   * Trata a data para que fique no formato adequado com as horas
   * @param {Date} date Data que será tratada
   * @returns {string} Texto com a data já tratada.
   */
  static treatDateWithHours(date: Date, withSeconds?: boolean): string {
    // eslint-disable-next-line
    if (date.getDate() == new Date().getDate()) {
      return withSeconds
        ? `Hoje às ${DateHelper.addLeftZero(
            date.getHours()
          )}:${DateHelper.addLeftZero(
            date.getMinutes()
          )}:${DateHelper.addLeftZero(date.getSeconds())}`
        : `Hoje às ${DateHelper.addLeftZero(
            date.getHours()
          )}:${DateHelper.addLeftZero(date.getMinutes())}`;
    } else {
      return withSeconds
        ? `${DateHelper.treatDateResumed(date)} às ${DateHelper.addLeftZero(
            date.getHours()
          )}:${DateHelper.addLeftZero(
            date.getMinutes()
          )}:${DateHelper.addLeftZero(date.getSeconds())}`
        : `${DateHelper.treatDateResumed(date)} às ${DateHelper.addLeftZero(
            date.getHours()
          )}:${DateHelper.addLeftZero(date.getMinutes())}`;
    }
  }
  /**
   * @static
   * Trata a data para que fique no formato de dia e mês
   * @param {Date} date Data que será tratada
   * @returns {string} Texto com o dia e mês resumidos.
   */
  static treatDayMonthResumed = (date: Date): string =>
    `${DateHelper.addLeftZero(date.getDate())}/${DateHelper.addLeftZero(
      date.getMonth() + 1
    )}`;
  /**
   * @static
   * Trata a data para exibição nos dispositivos móveis
   * @param {string} date Data no formato string
   * @returns {Date} Data já formatada para o dispositivo
   */
  static treatDateForDevice(date: string): Date {
    let dateArray: Array<any> = date.split(/[- :]/);
    return new Date(
      dateArray[0],
      dateArray[1] - 1,
      dateArray[2],
      dateArray[3],
      dateArray[4],
      dateArray[5]
    );
  }
  /**
   * @static
   * Trata a data para que fique no formato de nome do mês e ano resumidos
   * @param {Date} date Data que será tratada
   * @returns {string} Texto com o nome do mês e ano resumidos.
   */
  static treatMonthNameYearResumed(date: Date): string {
    let month: string = DateHelper.months[date.getMonth()].toUpperCase();
    let monthResumed: string = month.slice(0, 3);
    let year: string = date.getFullYear().toString();
    let yearResumed: string = year.slice(2, 4);
    return `${monthResumed}/${yearResumed}`;
  }

  /**
   * @static
   * Retorna quantos dias um mês tem
   * @param {number} month mês
   * @param {number} year ano
   * @returns {number} Quantidade de dias do mês
   */
  static getDaysInMonth = (month: number, year: number) =>
    new Date(year, month, 0).getDate();

  /**
   * @static
   * Retorna a data com barras no lugar dos traços
   * @param {string} dateString Texto com a data
   * @returns {string} Data formatada
   */
  static replaceTraceWithBar = (dateString: string) =>
    dateString.split("-").join("/");

  /**
   * @static
   * Retorna a data com traços no lugar de barras
   * @param {string} dateString Texto com a data
   * @returns {string} Data formatada
   */
  static replaceBarWithTrace = (dateString: string) =>
    dateString.split("/").join("-");
}
