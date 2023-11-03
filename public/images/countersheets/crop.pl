#!/bin/perl
my @hoff;
$voff[0] = 53;
$voff[1] = 579;
$voff[2] = 1132;
$voff[3] = 1656;
my $chitdim = 90;
my $chitstep = 100;
my $rowstep = 225;
my $topoff = 80;
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
			my $name = sprintf("u%02d%02d%02d%s", $sheet, $namex, $namey, $fob);
			my $cmd = sprintf("convert ${file}.png -crop %dx%d+%d+%d units/%s.png", $chitdim, $chitdim, $xoff, $yoff, $name);
			print "$cmd\n";
			system($cmd);
		    }
		}	
	    }	
	}   
    }
}
