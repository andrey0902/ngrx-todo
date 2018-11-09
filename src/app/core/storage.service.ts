
export class StorageService {
  /**
   * set user in local storage
   * */
  public static setUser(value: any): void {
    localStorage.setItem('task.user', JSON.stringify(value) );
  }
  /**
   * get user from local storage
   * */
  public static getUser() {
    return JSON.parse(localStorage.getItem('task.user'));
  }

  /**
   * set user in local storage
   * */
  public static setKey (value: any): void {
    StorageService.setStore(value, 'task.key');
  }
  /**
   * get user from local storage
   * */
  public static getKey() {
    return StorageService.getStore('task.key');
  }

  public static setTermsCookies(value: any): void {
    StorageService.setStore(value, 'task.cookies');
  }

  public static getTermsCookies() {
    return StorageService.getStore('task.cookies');
  }

  public static setStore(value, key: string) {
    localStorage.setItem(key, JSON.stringify(value) );
  }

  public static getStore(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
