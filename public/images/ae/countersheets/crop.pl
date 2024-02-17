#!/bin/perl
my @hoff;
# voff is the left hand side of the 4 columns of 5 units
$voff[0] = 61;
$voff[1] = 585;
$voff[2] = 1138;
$voff[3] = 1662;
my $chitdim = 80;
my $chitstep = 100;
my $rowstep = 225;
my $topoff = 86;
for my $sheet ('01', '02', '03', '04', '05', '06', '07', '08', '09') {
    for my $fob ('Front','Back') {
	my $file = sprintf("%s%s", $sheet, $fob);
	for my $v (0..3) {
	    for my $i (0..4) {
		for my $j (0..6) {
		    for my $k (0..1) {
			my $xoff = $voff[$v] + $i * $chitstep;
			my $namex = $i + ($v * 5);
			if ($fob eq 'Back') {
			    $namex = 19 - $namex;
			}
			my $yoff = $topoff + ($j * $rowstep) + ($k * $chitstep);
			my $namey = $k + $j * 2;
			my $name = sprintf("u%02d%02d%02d%s", $sheet, $namey, $namex, $fob);
			my $cmd = sprintf("convert ${file}.png -crop %dx%d+%d+%d units/$fob/%s.png", $chitdim, $chitdim, $xoff, $yoff, $name);
			print "$cmd\n";
			system($cmd);
		    }
		}	
	    }	
	}   
    }
}
