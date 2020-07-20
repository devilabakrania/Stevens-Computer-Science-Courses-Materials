
#########################################################
##  Purpose: Create C4.5 classification tree for the project
##  Developer: Priya Gupta  
##  CWID : 10457442
#########################################################
#
##  Step 0: Clear the environment and load the data

rm(list=ls())

filename<-file.choose()
dsn<-  read.csv(filename, ,na.string=" " ) 
dev.off


#replac na with 0
dsn[is.na(dsn)] <- 0

dsn$STATUS <- factor(dsn$STATUS, levels = c('A','T'), labels = c("Not Terminated","Terminated"))
View(dsn)
dsn$REHIRE<-factor(dsn$REHIRE, levels = c(TRUE,FALSE), labels = c("0","1"))
View(dsn)
dsn$EDUCATION_LEVEL<-factor(dsn$EDUCATION_LEVEL)
                            
View(dsn)

set.seed(123)
?ifelse

#dsn <- dsn[, -c(11)]
dsn<-dsn[,-c(1:2,4:7,9:12, 23:27)]


index<-sort(sample(nrow(dsn),round(.30*nrow(dsn))))
training<-dsn[-index,]
test<-dsn[index,]

#install.packages("C50", repos="http://R-Forge.R-project.org")
#install.packages("C50")
library('C50')
View(dsn)
?C5.0
# C50  classification 
library('C50')
C50_class <- C5.0(STATUS~.,data=training)

summary(C50_class )
dev.off()
plot(C50_class)
C50_predict<-predict( C50_class ,test , type="class" )

table(actual=test[,11],C50=C50_predict)
wrong<- (test[,11]!=C50_predict)
c50_rate<-sum(wrong)/length(test[,11])

c50_rate

                  