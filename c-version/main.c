// #define MAX_NUM 7000
// #define MIN_NUM_TO_PRINT 32

#define MAX_NUM 500
    //actually this is MAX_NUM+1...
#define MIN_NUM_TO_PRINT 12

//9000/32

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <limits.h>


// int countForNum[2*MAX_NUM*MAX_NUM];
// int firstIndexForNum[2*MAX_NUM*MAX_NUM];
// int nextIndex[MAX_NUM*MAX_NUM]; //for linked list
    //get seg fault id MAX_NUM 20!!

int main(void){

    // time_t rawtime;
    // struct tm * timeinfo;

    // time(&rawtime);
    // timeinfo = localtime ( &rawtime );

    // printf("Current local time and date: %s", asctime (timeinfo) );

    time_t startclock = clock();
    time_t starttime = time(0);

    //copy logic to get pythagorean triples

    // int maxnum=322; //fails to run if 323! too many arrays declared?
            //too much stack memory?
    // int squares[maxnum];
    

    printf("int max: %i\n", INT_MAX );


    int *countForNum; // p is pointer to int or (int*)
    countForNum = (int*)malloc(2*MAX_NUM*MAX_NUM*sizeof(int)); 

    int *firstIndexForNum;
    firstIndexForNum= (int*)malloc(2*MAX_NUM*MAX_NUM*sizeof(int));

    // int nextIndex[MAX_NUM*MAX_NUM]; //for linked list

    int *nextIndex;
    nextIndex= (int*)malloc(MAX_NUM*MAX_NUM*sizeof(int));


    for (int xx=0;xx<2*MAX_NUM*MAX_NUM;xx++){ 
        countForNum[xx]=0;
        // firstIndexForNum[xx]=-1; //can leave undefined
    }
    for (int xx=0;xx<MAX_NUM*MAX_NUM;xx++){ 
        nextIndex[xx]=-1;   //might leave undefined
    }

    //note these arrays maybe very sparse, impractically large

    for (int xx=1;xx<MAX_NUM;xx++){    
        int xsq = xx*xx;
        for (int yy=1;yy<=xx;yy++){
            int squared = xsq + yy*yy;
            
            countForNum[squared]++;
            int index = xx*MAX_NUM + yy;
            nextIndex[index] = firstIndexForNum[squared];
            firstIndexForNum[squared] = index;
        }
    }

    int numberPrinted = 0;
    //note that beyond MAX_NUM*MAX_NUM, might not have full count
    //since only considered x,y up to MAX_NUM
    // for (int xx=0;xx<2*MAX_NUM*MAX_NUM;xx++){
    for (int xx=0;xx<MAX_NUM*MAX_NUM;xx++){
        int thecount = countForNum[xx];
        if (thecount>=MIN_NUM_TO_PRINT){
            printf("number: %i (%i) : ", xx, thecount );
            int currentIndex = firstIndexForNum[xx];
            for (int aa=0;aa<thecount;aa++){
                int numberOne = currentIndex % MAX_NUM;
                int numberTwo = (currentIndex-numberOne)/MAX_NUM;
                printf("\t(%i,%i), ", numberOne, numberTwo);
                currentIndex = nextIndex[currentIndex];
            }
            printf("\n");
            numberPrinted++;
        }
    }
    printf("number printed: %i\n", numberPrinted);

    free(countForNum);
    free(firstIndexForNum);
    free(nextIndex);

    time_t timeelapsed = clock()- startclock;

    printf("time taken: %i\n", (int) timeelapsed );
    printf("time taken: %i\n", (int) ((time(0)- starttime)*1000) );

    printf("clocks per sec: %i\n", (int) CLOCKS_PER_SEC);
    int total_millis = (int) (timeelapsed / (CLOCKS_PER_SEC/1000));
    printf("time taken: %i\n", total_millis );

    printf("Hello, World!\n");
    return 0;
}