import { Injectable } from '@angular/core';
import { Board } from 'src/app/models/board/board.model';
import { Column } from 'src/app/models/column/column.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  // local storage
  getDataString(): string | null {
    return localStorage.getItem("data");
  }

  setDataString(dataString: string){
    localStorage.setItem("data", dataString);
  }

  // get all data
  getData(): Observable<Board[]> {
    let dataString = this.getDataString();
    return (dataString) ? of(JSON.parse(dataString)) : of([]);
  }

  // board
  createBoard(board: Board): Observable<Board> | null{
    let dataString = this.getDataString();
    let dataJson: Array<Board> = (dataString) ? JSON.parse(dataString) : [];

    if (this.boardIndex(dataJson, board) === -1){
      dataJson.push(board);
      this.setDataString(JSON.stringify(dataJson));
      return of(board);
    }
    return null;
  }

  deleteBoard(board: Board): Observable<Board> {
    let dataString = this.getDataString();
    if (dataString) {
      let dataJson: Array<Board> = JSON.parse(dataString);
      dataJson.splice(this.boardIndex(dataJson, board), 1);
      this.setDataString(JSON.stringify(dataJson));
    }
    return of(board);
  }

  private boardIndex(arr: Array<Board>, board: Board): number {
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].name === board.name) {
        return i;
      }
    }
    return -1;
  }

  private boardIndexByName(arr: Array<Board>, boardName: string): number {
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].name === boardName) {
        return i;
      }
    }
    return -1;
  }

  // column
  getColumns(boardName: string): Observable<Column[]> | null {
    let dataString = this.getDataString();
    let dataJson: Array<Board> = (dataString) ? JSON.parse(dataString) : [];
    let index = this.boardIndexByName(dataJson, boardName);

    return (index === -1) ? null :of(dataJson[index].columns);

  }

  createColumn(boardName: string, column: Column): Observable<Column> | null {
    let dataString = this.getDataString();
    let dataJson: Array<Board> = (dataString) ? JSON.parse(dataString) : [];

    let index = this.boardIndexByName(dataJson, boardName);

    if (index !== -1){
      if (this.columnIndex(dataJson[index].columns, column) === -1){
        dataJson[index].columns.push(column);
        this.setDataString(JSON.stringify(dataJson));
        return of(column);
      }
      return null;
    }
    return null;
  }

  deleteColumn(boardName: string, column: Column): Observable<Column> {
    let dataString = this.getDataString();
    if (dataString) {
      let dataJson: Array<Board> = JSON.parse(dataString);
      let index = this.boardIndexByName(dataJson, boardName);
      dataJson[index].columns.splice(this.columnIndex(dataJson[index].columns, column), 1);
      this.setDataString(JSON.stringify(dataJson));
    }
    return of(column);
  }

  private columnIndex(arr: Array<Column>, column: Column): number {
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].name === column.name) {
        return i;
      }
    }
    return -1;
  }

  // drag and drop
  shiftInSameBoard(boardName: string, prevColumnIndex: number, currColumnIndex: number): void {
    let dataString = this.getDataString();
    let dataJson: Array<Board> = (dataString) ? JSON.parse(dataString) : [];

    let boardIndex = this.boardIndexByName(dataJson, boardName);

    let column: Column = dataJson[boardIndex].columns[prevColumnIndex];
    dataJson[boardIndex].columns.splice(prevColumnIndex, 1);
    dataJson[boardIndex].columns.splice(currColumnIndex, 0, column);

    this.setDataString(JSON.stringify(dataJson));
  }

  // list item
  createListItem(boardName: string, column: Column, listItem: string): Observable<string> | null {
    let dataString = this.getDataString();
    let dataJson: Array<Board> = (dataString) ? JSON.parse(dataString) : [];

    let boardIndex = this.boardIndexByName(dataJson, boardName);
    let columnIndex = this.columnIndex(dataJson[boardIndex].columns, column);

    if (boardIndex !== -1){
      if (columnIndex !== -1){
        dataJson[boardIndex].columns[columnIndex].list.push(listItem);
        this.setDataString(JSON.stringify(dataJson));
        return of(listItem);
      }
      return null;
    }
    return null;
  }

  deleteListItem(boardName: string, column: Column, listItem: string): Observable<string> {
    let dataString = this.getDataString();
    if (dataString) {
      let dataJson: Array<Board> = JSON.parse(dataString);
      let boardIndex = this.boardIndexByName(dataJson, boardName);
      let columnIndex = this.columnIndex(dataJson[boardIndex].columns, column);

      dataJson[boardIndex].columns[columnIndex].list.splice(this.listIndex(dataJson[boardIndex].columns[columnIndex].list, listItem), 1);
      this.setDataString(JSON.stringify(dataJson));
    }
    return of(listItem);
  }

  getListItems(boardName: string, column: Column): Observable<string[]> | null {
    let dataString = this.getDataString();
    let dataJson: Array<Board> = (dataString) ? JSON.parse(dataString) : [];
    let boardIndex = this.boardIndexByName(dataJson, boardName);
    let columnIndex = this.columnIndex(dataJson[boardIndex].columns, column);

    return (boardIndex === -1 || columnIndex === -1) ? null : of(dataJson[boardIndex].columns[columnIndex].list);
  }

  private listIndex(listItems: string[], listItem: string): number {
    for (let i = 0; i < listItems.length; i++){
      if (listItems[i] === listItem){
        return i;
      }
    }
    return -1;
  }

  // drag n drop
  shiftInSameColumn(boardName: string, column: Column, prevListItemIndex: number, currListItemIndex: number): void {
    let dataString = this.getDataString();
    let dataJson: Array<Board> = (dataString) ? JSON.parse(dataString) : [];

    let boardIndex = this.boardIndexByName(dataJson, boardName);
    let columnIndex = this.columnIndex(dataJson[boardIndex].columns, column);

    let listItem: string = dataJson[boardIndex].columns[columnIndex].list[prevListItemIndex];
    dataJson[boardIndex].columns[columnIndex].list.splice(prevListItemIndex, 1);
    dataJson[boardIndex].columns[columnIndex].list.splice(currListItemIndex, 0, listItem);

    this.setDataString(JSON.stringify(dataJson));
  }

  shiftAcrossColumn(boardName: string, prevListItemsOfPrevContainer: Array<string>, prevListItemsOfCurrentContainer: Array<string>, prevListItemIndex: number, currListItemIndex: number): void {
    let dataString = this.getDataString();
    let dataJson: Array<Board> = (dataString) ? JSON.parse(dataString) : [];
    let boardIndex = this.boardIndexByName(dataJson, boardName);

    let prevColumnIndex = this.columnIndexByListItems(dataJson[boardIndex].columns, prevListItemsOfPrevContainer);
    let currColumnIndex = this.columnIndexByListItems(dataJson[boardIndex].columns, prevListItemsOfCurrentContainer);

    let listItem = dataJson[boardIndex].columns[prevColumnIndex].list[prevListItemIndex];
    dataJson[boardIndex].columns[prevColumnIndex].list.splice(prevListItemIndex, 1);
    dataJson[boardIndex].columns[currColumnIndex].list.splice(currListItemIndex, 0, listItem);
    this.setDataString(JSON.stringify(dataJson));
  }

  private columnIndexByListItems(columnArray: Array<Column>, listItem: Array<string>): number {
    for(let i = 0; i < columnArray.length; i++) {
      if(this.isSameListItems(columnArray[i].list, listItem)) {
        return i;
      }
    }
    return -1;
  }

  private isSameListItems(listItems1: Array<string>, listItems2: Array<string>): boolean {
    if(listItems1.length === listItems2.length) {
      for(let i = 0; i < listItems1.length; i++) {
        if(listItems1[i] !== listItems2[i]){
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
