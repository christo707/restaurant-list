import {Component, ViewChild, OnInit, Inject} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { HttpClient } from "@angular/common/http";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  loading: boolean = true;
  restaurants;

  displayedColumns = ['id', 'name', 'cuisines', 'rating', 'avg', 'details'];
  dataSource: MatTableDataSource<Restaurant>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort ,{static: false}) sort: MatSort;

  openDialog(row: Restaurant): void {
      const dialogRef = this.dialog.open(DialogRestaurant, {
        width: '45%',
        height: '60%',
        data: row
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Restarant ' + row.id + ' Dialog closed.');
      });

    }


  constructor(private httpClient: HttpClient, public dialog: MatDialog){}

  ngOnInit() {
    this.httpClient.get("assets/data.json").subscribe((data: any)  =>{

      this.restaurants = data.map((d: any)  => ({

        id: d["Restaurant ID"],
        name: d["Restaurant Name"],
        cuisines: d["Cuisines"],
        avg: d["Average Cost for two"],
        curr: d["Currency"],
        tablebooking:d["Has Table booking"],
        delivery: d["Has Online delivery"],
        rating: d["Aggregate rating"],
        color: d["Rating color"],
        ratingtext: d["Rating text"],
        votes: d["Votes"],
        details: "Details"
      }));
        this.dataSource = new MatTableDataSource(this.restaurants);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
    })
  }

  getColor(color){
    if(color == 'Dark Green')
      return '#013220';
      else
      return color;
  }

  viewRow(row: Restaurant){
    this.openDialog(row);
  }

  // ngAfterViewInit() {
  //
  // }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}


export interface Restaurant {
  id: string,
  name: string,
  cuisines: string,
  avg: string,
  curr: string,
  tablebooking:string,
  delivery: string,
  rating: string,
  color: string,
  ratingtext: string,
  votes: string,
  details: string
}


@Component({
  selector: 'dialog-restaurant',
  templateUrl: 'dialog-restaurant.html',
})
export class DialogRestaurant {

  constructor(
    public dialogRef: MatDialogRef<DialogRestaurant>,
    @Inject(MAT_DIALOG_DATA) public data: Restaurant) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getColor(color){
    if(color == 'Dark Green')
      return '#013220';
      else
      return color;
  }

}
