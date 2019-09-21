// FILE WITH MOCKS FOR UNIT TESTING

export class RouterMock {
  public navigateByUrl() {
    return true;
  }
}

export class ActivatedRouteMock {
  public outlet = '';
  public snapshot = {
    paramMap: {
      get: function (param: String) {
        if (param && param === 'id') {
          return 1;
        }
        if (param && param === 'username') {
          return 'tester';
        }
        return false;
      }
    }
  };
}

export class MatDialogMock {
}

export class Renderer2Mock {
}

export class MatSnackBarMock {
}

export class LocalStorageMock {
}

export class DomSanitizerMock {
}






