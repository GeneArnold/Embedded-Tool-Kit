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
5. After you copy these files you will need to edit the jrsConfig.js file to reference your location of JRS. This file is located in vizjs_toolkit->configuration and the line number is 30.
