Embedded-Tool-Kit
=================

This tool kit is made available to help create dynamic content inside of Jasper Reports hosted on JasperReports Server. 

To install this toolkit and run the demo please do the following...

1. Download this project to you computer
2. Un-zip the project's contents
3. Import the Enbedded_Toolkit_Reports_Export.zip file into your JRS install. (Must be used on JRS 6 and above)
4. Copy the following files into your webapps->JRS_Install_Location->optimized-scripts
jr.Dialog.js
jr.RunReport.js
vizjs_toolkit
5. Also copy jasperreports-htmlcomponent-5.0.1.jar to webapps->JRS_Install_Location->WEB-INF->lib
6. After you copy these files you will need to edit the jrsConfig.js file to reference your location of JRS. This file is located in vizjs_toolkit->configuration and the line number is 30.

Along with the reports export the single reports are located in this project if you would like to open those and upload them to JRS on your own. 

You will also notice two files with _Simple in their name. These are very basic versions of this project's concept and will be used for an upcoming video showing the idea behind this toolkit and how others could create their own.
